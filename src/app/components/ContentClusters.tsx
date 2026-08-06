import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { client } from '../lib/amplifyClient';
import { listCategoriesForProduct, listProducts } from '../lib/content';
import { resolveIcon } from '../lib/iconMap';

export function ContentClusters() {
  const [clusters, setClusters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const products = await listProducts();
      const withCounts = await Promise.all(
        products.map(async (p) => {
          const categories = await listCategoriesForProduct(p.id);
          const counts = await Promise.all(
            categories.map((c) =>
              client.models.Article.list({
                filter: { categoryId: { eq: c.id }, status: { eq: 'PUBLISHED' } },
              })
            )
          );
          const articleCount = counts.reduce((sum, r) => sum + (r.data?.length ?? 0), 0);
          return { ...p, articleCount };
        })
      );
      setClusters(withCounts);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Product</h2>
        <p className="text-lg text-gray-600">Find answers organized by topic area</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clusters.map((cluster) => (
          <Link
            key={cluster.id}
            to={`/product/${cluster.slug}`}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#C15AB3] hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="mb-3">
              <img
                src={resolveIcon(cluster.iconKey)}
                alt={cluster.title}
                className={cluster.slug === 'about-brightpath' ? 'max-w-24 max-h-12 object-contain' : 'w-12 h-12 object-contain'}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{cluster.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{cluster.description}</p>
              <div className="text-sm text-gray-500 font-medium">{cluster.articleCount} articles</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
