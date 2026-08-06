import { useParams, Link } from 'react-router';
import { ChevronRight, Home, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  getSupportTVCategoryBySlug,
  getSupportTVItemBySlug,
  listVideosForItem,
} from '../lib/content';
import type { Schema } from '../../../amplify/data/resource';

type CategoryT = Schema['SupportTVCategory']['type'];
type ItemT = Schema['SupportTVItem']['type'];
type VideoT = Schema['Video']['type'];

// A single-video item is represented as a one-element "playlist" so the
// player UI below can treat both cases uniformly.
function itemAsVideo(item: ItemT): VideoT {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    duration: item.duration,
    thumbnailUrl: item.thumbnailUrl,
    videoUrl: item.videoUrl,
  } as VideoT;
}

export default function SupportTVPlaylist() {
  const { category: categorySlug, playlist: itemSlug } = useParams();
  const [category, setCategory] = useState<CategoryT | null>(null);
  const [item, setItem] = useState<ItemT | null>(null);
  const [videos, setVideos] = useState<VideoT[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoT | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const cat = await getSupportTVCategoryBySlug(categorySlug ?? '');
      if (cancelled || !cat) {
        setLoading(false);
        return;
      }
      setCategory(cat);
      const foundItem = await getSupportTVItemBySlug(cat.id, itemSlug ?? '');
      if (cancelled || !foundItem) {
        setLoading(false);
        return;
      }
      setItem(foundItem);

      if (foundItem.type === 'PLAYLIST') {
        const vids = await listVideosForItem(foundItem.id);
        if (cancelled) return;
        setVideos(vids);
        setSelectedVideo(vids[0] ?? null);
      } else {
        const single = itemAsVideo(foundItem);
        setVideos([single]);
        setSelectedVideo(single);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [categorySlug, itemSlug]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16 text-gray-500">Loading…</div>;
  if (!category || !item || !selectedVideo) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">Video not found.</div>;
  }

  const isSingleVideo = videos.length === 1;

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
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{item.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
        <p className="text-gray-600">{item.description}</p>
      </div>

      {/* Video Player and Playlist */}
      <div className={isSingleVideo ? '' : 'grid lg:grid-cols-3 gap-6'}>
        {/* Main Video Player */}
        <div className={isSingleVideo ? 'max-w-5xl mx-auto' : 'lg:col-span-2'}>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="aspect-video bg-gray-900">
              <iframe
                src={selectedVideo.videoUrl ?? ''}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              ></iframe>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="font-medium">{selectedVideo.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist */}
        {!isSingleVideo && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#3EC6C2] to-[#C15AB3] text-white px-4 py-3">
                <h3 className="font-bold">Playlist</h3>
                <p className="text-sm text-white/90">{videos.length} videos</p>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      selectedVideo.id === video.id ? 'bg-[#C15AB3]/5 border-l-4 border-l-[#C15AB3]' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0 w-32 h-18">
                        <img
                          src={video.thumbnailUrl ?? ''}
                          alt={video.title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/30 rounded flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" fill="white" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{video.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{video.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
