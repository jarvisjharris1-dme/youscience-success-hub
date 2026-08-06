import { useParams, Link } from 'react-router';
import { ChevronRight, Home, PlayCircle, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  getSupportTVCategoryBySlug,
  listSupportTVItemsForCategory,
  listVideosForItem,
} from '../lib/content';
import type { Schema } from '../../../amplify/data/resource';

type CategoryT = Schema['SupportTVCategory']['type'];
type ItemT = Schema['SupportTVItem']['type'] & { videoCount?: number };

export default function SupportTVCategoryPlaylists() {
  const { category: categorySlug } = useParams();
  const [category, setCategory] = useState<CategoryT | null>(null);
  const [items, setItems] = useState<ItemT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const cat = await getSupportTVCategoryBySlug(categorySlug ?? '');
      if (cancelled) return;
      setCategory(cat);
      if (cat) {
        const list = await listSupportTVItemsForCategory(cat.id);
        const withCounts = await Promise.all(
          list.map(async (item) => {
            if (item.type === 'PLAYLIST') {
              const videos = await listVideosForItem(item.id);
              return { ...item, videoCount: videos.length };
            }
            return item;
          })
        );
        if (!cancelled) setItems(withCounts);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16 text-gray-500">Loading…</div>;
  if (!category) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">Category not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link to="/support-tv" className="text-gray-500 hover:text-[#C15AB3] transition-colors">
          Support TV
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{category.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.title}</h1>
        <p className="text-lg text-gray-600">{category.description}</p>
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/support-tv/${category.slug}/${item.slug}`}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#C15AB3] hover:shadow-lg transition-all group"
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
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.type === 'PLAYLIST' ? (
                      <PlayCircle className="w-8 h-8 text-[#C15AB3]" />
                    ) : (
                      <Play className="w-8 h-8 text-[#C15AB3]" fill="currentColor" />
                    )}
                  </div>
                </div>
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
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#C15AB3] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500 text-sm col-span-full">No videos in this category yet.</p>
        )}
      </div>
    </div>
  );
}
