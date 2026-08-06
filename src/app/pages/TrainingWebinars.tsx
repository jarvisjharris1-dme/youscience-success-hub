import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Home } from 'lucide-react';
import { client } from '../lib/amplifyClient';
import { listWebinarLinksForSection, listWebinarSections } from '../lib/content';

export default function TrainingWebinars() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [linksBySection, setLinksBySection] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const secs = await listWebinarSections();
      setSections(secs);

      const results = await Promise.all(
        secs.map(async (s) => {
          const links = await listWebinarLinksForSection(s.id);
          const enriched = await Promise.all(
            links.map(async (link) => {
              if (link.linkedArticleId) {
                const { data: article } = await client.models.Article.get({ id: link.linkedArticleId });
                if (article) {
                  const { data: category } = await client.models.Category.get({ id: article.categoryId });
                  const product = category
                    ? (await client.models.Product.get({ id: category.productId })).data
                    : null;
                  return { ...link, article, productSlug: product?.slug };
                }
              }
              return link;
            })
          );
          return [s.id, enriched] as const;
        })
      );
      setLinksBySection(Object.fromEntries(results));
      setLoading(false);
    })();
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">Training Webinars</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Training Webinars</h1>
        <p className="text-lg text-gray-600">Access live and pre-recorded training sessions</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200">
          {sections.map((section, index) => {
            const links = linksBySection[section.id] ?? [];
            const isExpanded = expandedSections.includes(section.id);
            return (
              <div key={section.id} className={index !== 0 ? 'border-t border-gray-200' : ''}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && links.length > 0 && (
                  <div className="border-t border-gray-100">
                    {links.map((link) => {
                      const content = (
                        <>
                          <span className="text-gray-700 group-hover:text-[#C15AB3] transition-colors">
                            {link.title}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C15AB3] transition-colors" />
                        </>
                      );
                      const rowClasses =
                        'flex items-center justify-between px-6 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors group';

                      if (link.externalUrl) {
                        return (
                          <a
                            key={link.id}
                            href={link.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={rowClasses}
                          >
                            {content}
                          </a>
                        );
                      }
                      if (link.article && link.productSlug) {
                        return (
                          <Link
                            key={link.id}
                            to={`/product/${link.productSlug}/article/${link.article.slug}`}
                            className={rowClasses}
                          >
                            {content}
                          </Link>
                        );
                      }
                      return (
                        <div key={link.id} className={`${rowClasses} cursor-default opacity-60`}>
                          {content}
                        </div>
                      );
                    })}
                  </div>
                )}

                {isExpanded && links.length === 0 && (
                  <div className="px-6 py-4 text-gray-500 text-sm border-t border-gray-100">
                    No items available yet
                  </div>
                )}
              </div>
            );
          })}
          {sections.length === 0 && (
            <div className="px-6 py-8 text-gray-500 text-sm text-center">No webinar sections yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
