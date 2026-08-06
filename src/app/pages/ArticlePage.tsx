import { useParams, Link } from 'react-router';
import { ChevronRight, Home, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '../lib/amplifyClient';

export default function ArticlePage() {
  const { productId, articleId } = useParams();
  const [helpfulVote, setHelpfulVote] = useState<'yes' | 'no' | null>(null);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      // articleId in the URL is the article's slug
      const { data: matches } = await client.models.Article.list({
        filter: { slug: { eq: articleId ?? '' } },
      });
      const found = matches?.[0] ?? null;
      if (cancelled) return;
      setArticle(found);

      if (found) {
        const { data: category } = await client.models.Category.get({ id: found.categoryId });
        if (category) {
          const { data: prod } = await client.models.Product.get({ id: category.productId });
          if (!cancelled) setProduct(prod);
        }
      } else if (productId) {
        const { data: prodMatches } = await client.models.Product.list({
          filter: { slug: { eq: productId } },
        });
        if (!cancelled) setProduct(prodMatches?.[0] ?? null);
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [articleId, productId]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-gray-500">Loading article…</div>;
  }

  const productTitle = product?.title ?? 'Success Hub';
  const productSlug = product?.slug ?? productId;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link to={`/product/${productSlug}`} className="text-gray-500 hover:text-[#C15AB3] transition-colors">
          {productTitle}
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{article?.title ?? 'Article'}</span>
      </nav>

      <div className="max-w-4xl">
        <article className="bg-white rounded-xl border border-gray-200 p-8 lg:p-12">
          {!article ? (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Content coming soon</h1>
              <p className="text-gray-600">
                This article hasn't been published yet. Check back soon, or explore other articles
                in <strong>{productTitle}</strong>.
              </p>
            </div>
          ) : (
            <>
              {/* Article Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                {article.subheading && (
                  <div className="inline-block px-3 py-1 bg-[#C15AB3]/10 text-[#C15AB3] rounded-full text-sm font-medium mb-4">
                    {article.subheading}
                  </div>
                )}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Last updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
                  {article.readTime && (
                    <>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Article Body */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.contentHtml || '' }}
                style={{ fontSize: '16px', lineHeight: '1.75', color: '#374151' }}
              />
            </>
          )}

          {/* Feedback Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Was this article helpful?</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setHelpfulVote('yes')}
                  className={`flex items-center gap-2 px-6 py-2 border rounded-lg font-medium transition-all ${
                    helpfulVote === 'yes'
                      ? 'bg-[#C15AB3] text-white border-[#C15AB3]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#C15AB3]'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  Yes
                </button>
                <button
                  onClick={() => setHelpfulVote('no')}
                  className={`flex items-center gap-2 px-6 py-2 border rounded-lg font-medium transition-all ${
                    helpfulVote === 'no'
                      ? 'bg-gray-700 text-white border-gray-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-700'
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                  No
                </button>
              </div>
              {helpfulVote && (
                <p className="mt-4 text-sm text-gray-600">Thank you for your feedback!</p>
              )}
            </div>
          </div>

          {/* Back to Product */}
          <div className="mt-8">
            <Link
              to={`/product/${productSlug}`}
              className="inline-flex items-center gap-2 text-[#C15AB3] hover:text-[#C15AB3]/80 font-medium"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to {productTitle}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
