import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Home, Search } from 'lucide-react';
import { client } from '../lib/amplifyClient';
import { resolveIcon } from '../lib/iconMap';
import type { Schema } from '../../../amplify/data/resource';

type ProductT = Schema['Product']['type'];
type CategoryT = Schema['Category']['type'];
type ArticleT = Schema['Article']['type'];

export default function ProductPage() {
  const { productId } = useParams(); // this is the product's slug
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<ProductT[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductT | null>(null);
  const [categories, setCategories] = useState<CategoryT[]>([]);
  const [articlesByCategory, setArticlesByCategory] = useState<Record<string, ArticleT[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    client.models.Product.list().then(({ data }) =>
      setAllProducts([...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)))
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data: products } = await client.models.Product.list({
        filter: { slug: { eq: productId ?? '' } },
      });
      const product = products?.[0] ?? null;
      if (cancelled) return;
      setCurrentProduct(product);

      if (product) {
        const { data: cats } = await client.models.Category.list({
          filter: { productId: { eq: product.id } },
        });
        const sortedCats = [...(cats ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        if (cancelled) return;
        setCategories(sortedCats);

        const articleLists = await Promise.all(
          sortedCats.map((c) =>
            client.models.Article.list({
              filter: { categoryId: { eq: c.id }, status: { eq: 'PUBLISHED' } },
            })
          )
        );
        if (cancelled) return;
        const map: Record<string, ArticleT[]> = {};
        sortedCats.forEach((c, i) => {
          map[c.id] = articleLists[i].data ?? [];
        });
        setArticlesByCategory(map);
      }
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-gray-500">Loading…</div>;
  }

  if (!currentProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        Product not found.
      </div>
    );
  }

  const searchLower = search.trim().toLowerCase();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{currentProduct.title}</span>
      </nav>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter a question or topic"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C15AB3] focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left Sidebar */}
        <aside className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-8">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <h3 className="font-bold text-gray-900">Products</h3>
            </div>
            <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto">
              {allProducts.map((product) => {
                const isActive = product.id === currentProduct.id;
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      isActive ? 'bg-[#C15AB3]/5 border-l-4 border-l-[#C15AB3]' : ''
                    }`}
                  >
                    <img
                      src={resolveIcon(product.iconKey)}
                      alt={product.title}
                      className={`max-w-5 max-h-5 object-contain ${isActive ? '' : 'opacity-70'}`}
                    />
                    <span className={`text-sm ${isActive ? 'text-[#C15AB3] font-semibold' : 'text-gray-700'}`}>
                      {product.title}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {/* Product Header */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src={resolveIcon(currentProduct.iconKey)}
                    alt={currentProduct.title}
                    className="max-w-16 max-h-16 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentProduct.title}</h1>
                  <p className="text-lg text-gray-600">
                    {currentProduct.description || 'Click a section to get started.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Categories and Articles */}
            <div className="space-y-2">
              {categories.length === 0 && (
                <p className="text-gray-500 text-sm">No sections yet for this product.</p>
              )}
              {categories.map((category) => {
                const isExpanded = expandedCategories.includes(category.id);
                const articles = (articlesByCategory[category.id] ?? []).filter((a) =>
                  searchLower ? a.title.toLowerCase().includes(searchLower) : true
                );
                if (searchLower && articles.length === 0) return null;

                return (
                  <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 text-left">{category.title}</span>
                      {isExpanded || searchLower ? (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {(isExpanded || searchLower) && (
                      <div className="bg-white">
                        {articles.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-400 border-t border-gray-100">
                            No articles in this section yet.
                          </div>
                        )}
                        {articles.map((article) => (
                          <Link
                            key={article.id}
                            to={`/product/${currentProduct.slug}/article/${article.slug}`}
                            className="block px-4 py-3 border-t border-gray-100 hover:bg-gray-50 text-gray-700 hover:text-[#C15AB3] transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span>{article.title}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
