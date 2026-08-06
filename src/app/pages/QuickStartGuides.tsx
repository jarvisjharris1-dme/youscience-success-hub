import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '../lib/amplifyClient';
import { listQuickStartGuides } from '../lib/content';
import { resolveIcon } from '../lib/iconMap';

export default function QuickStartGuides() {
  const [guides, setGuides] = useState<any[]>([]);
  const [productBySlug, setProductBySlug] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const articles = await listQuickStartGuides();
      const categoryIds = [...new Set(articles.map((a) => a.categoryId))];
      const categories = await Promise.all(
        categoryIds.map((id) => client.models.Category.get({ id }))
      );
      const categoryToProduct: Record<string, string> = {};
      const productIds = new Set<string>();
      categories.forEach(({ data: c }) => {
        if (c) {
          categoryToProduct[c.id] = c.productId;
          productIds.add(c.productId);
        }
      });
      const products = await Promise.all(
        [...productIds].map((id) => client.models.Product.get({ id }))
      );
      const productMap: Record<string, any> = {};
      products.forEach(({ data: p }) => {
        if (p) productMap[p.id] = p;
      });

      const enriched = articles.map((a) => {
        const productId = categoryToProduct[a.categoryId];
        const product = productMap[productId];
        return { ...a, product };
      });
      setGuides(enriched);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">Quick Start Guides</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Start Guides</h1>
        <p className="text-lg text-gray-600">Get up and running quickly with these product guides</p>
      </div>

      {/* Quick Guides List */}
      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              to={`/product/${guide.product?.slug ?? ''}/article/${guide.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#C15AB3] hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <img
                    src={resolveIcon(guide.product?.iconKey)}
                    alt={guide.product?.title ?? ''}
                    className="w-12 h-12"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#C15AB3] transition-colors">
                    {guide.title}
                  </h3>
                  {guide.product && <p className="text-sm text-gray-500">{guide.product.title}</p>}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#C15AB3] transition-colors" />
              </div>
            </Link>
          ))}
          {guides.length === 0 && (
            <p className="text-gray-500 text-sm col-span-full">
              No quick start guides published yet. Mark an article as a Quick Start Guide from /admin.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
