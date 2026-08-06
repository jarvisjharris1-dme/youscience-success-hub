import { Link } from 'react-router';
import { Video, ChevronRight, Home, ChevronLeft, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { client } from '../lib/amplifyClient';
import { listSupportTVCategories, listSupportTVItemsForCategory, listVideosForItem } from '../lib/content';
import { resolveIcon } from '../lib/iconMap';
import type { Schema } from '../../../amplify/data/resource';

type CategoryT = Schema['SupportTVCategory']['type'];
type ItemT = Schema['SupportTVItem']['type'] & { videoCount?: number };

export default function SupportTVCategories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<CategoryT[]>([]);
  const [itemsByCategory, setItemsByCategory] = useState<Record<string, ItemT[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const cats = await listSupportTVCategories();
      setCategories(cats);
      const results = await Promise.all(
        cats.map(async (c) => {
          const items = await listSupportTVItemsForCategory(c.id);
          const withCounts = await Promise.all(
            items.map(async (item) => {
              if (item.type === 'PLAYLIST') {
                const videos = await listVideosForItem(item.id);
                return { ...item, videoCount: videos.length };
              }
              return item;
            })
          );
          return [c.id, withCounts] as const;
        })
      );
      setItemsByCategory(Object.fromEntries(results));
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-gray-500">Loading…</div>;
  }

  const matchesQuery = (item: ItemT) => {
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || (item.description ?? '').toLowerCase().includes(q);
  };

  const anyResults = categories.some((c) => (itemsByCategory[c.id] ?? []).some(matchesQuery));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">Support TV</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Support TV</h1>
        <p className="text-lg text-gray-600">Search for videos or browse video tutorials by category</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for videos..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C15AB3] focus:border-transparent transition-all text-gray-900"
          />
        </div>
      </div>

      {/* Category Sections with Horizontal Scrolling */}
      <div className="space-y-12">
        {categories.map((category) => {
          const items = (itemsByCategory[category.id] ?? []).filter(matchesQuery);
          if (items.length === 0) return null;
          return <CategoryRow key={category.id} category={category} items={items} />;
        })}

        {searchQuery && !anyResults && (
          <div className="text-center py-16">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try searching with different keywords</p>
          </div>
        )}

        {categories.length === 0 && (
          <div className="text-center py-16 text-gray-500">No Support TV content yet.</div>
        )}
      </div>
    </div>
  );
}

function CategoryRow({ category, items }: { category: CategoryT; items: ItemT[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 680;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const icon = resolveIcon(category.slug);

  return (
    <div>
      {/* Category Header */}
      <div className="mb-4 flex items-center gap-3">
        {category.slug !== 'whats-new' && <img src={icon} alt="" className="w-6 h-6" />}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
          <p className="text-gray-600">{category.description}</p>
        </div>
      </div>

      {/* Horizontal Scrolling Container with Arrows */}
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 hover:bg-white border-2 border-gray-300 hover:border-[#C15AB3] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 hover:bg-white border-2 border-gray-300 hover:border-[#C15AB3] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/support-tv/${category.slug}/${item.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#C15AB3] hover:shadow-lg transition-all group"
                style={{ width: '320px', flexShrink: 0 }}
              >
                <div className="relative">
                  {item.type === 'PLAYLIST' && (
                    <>
                      <div className="absolute top-1 left-2 right-2 h-2 bg-gray-300 rounded-t-lg z-0"></div>
                      <div className="absolute top-2 left-1 right-1 h-2 bg-gray-200 rounded-t-lg z-0"></div>
                    </>
                  )}
                  <div className="relative aspect-video bg-gray-100">
                    <img src={item.thumbnailUrl ?? ''} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      {item.type === 'PLAYLIST' && (
                        <span className="px-2.5 py-1 bg-gradient-to-r from-[#C15AB3] to-[#3EC6C2] text-white text-xs rounded font-semibold uppercase tracking-wide">
                          Playlist
                        </span>
                      )}
                      {item.type === 'PLAYLIST' && (
                        <span className="px-2 py-1 bg-black/80 text-white text-xs rounded font-medium">
                          {item.videoCount ?? 0} videos
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black/80 text-white text-xs rounded">{item.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#C15AB3] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
