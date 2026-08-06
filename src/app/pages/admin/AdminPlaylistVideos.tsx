import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { client } from '../../lib/amplifyClient';
import { createVideo, deleteVideo, listVideosForItem, updateVideo } from '../../lib/content';

export default function AdminPlaylistVideos() {
  const { itemId } = useParams();
  const [item, setItem] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    if (!itemId) return;
    const { data } = await client.models.SupportTVItem.get({ id: itemId });
    setItem(data);
    setVideos(await listVideosForItem(itemId));
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, [itemId]);

  async function handleAdd() {
    if (!itemId) return;
    await createVideo({
      title: 'New video',
      itemId,
      sortOrder: videos.length,
    });
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this video?')) return;
    await deleteVideo(id);
    refresh();
  }

  function handleFieldChange(id: string, field: string, value: string) {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  }

  async function handleSave(video: any) {
    await updateVideo({
      id: video.id,
      title: video.title,
      description: video.description,
      duration: video.duration,
      thumbnailUrl: video.thumbnailUrl,
      videoUrl: video.videoUrl,
    });
  }

  if (loading) return <div className="text-gray-500">Loading…</div>;

  return (
    <div className="max-w-3xl">
      <Link to="/admin/support-tv" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4">
        <ChevronLeft className="w-4 h-4" />
        Back to Support TV
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{item?.title}</h1>
      <p className="text-gray-500 mb-6">Manage the videos in this playlist.</p>

      <div className="space-y-4 mb-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <input
                value={video.title}
                onChange={(e) => handleFieldChange(video.id, 'title', e.target.value)}
                className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 text-sm flex-1 mr-2"
              />
              <button onClick={() => handleDelete(video.id)} className="text-gray-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                value={video.description ?? ''}
                onChange={(e) => handleFieldChange(video.id, 'description', e.target.value)}
                placeholder="Description"
                className="px-2 py-1.5 border border-gray-300 rounded text-sm col-span-2"
              />
              <input
                value={video.duration ?? ''}
                onChange={(e) => handleFieldChange(video.id, 'duration', e.target.value)}
                placeholder="Duration (e.g. 4:32)"
                className="px-2 py-1.5 border border-gray-300 rounded text-sm"
              />
              <input
                value={video.thumbnailUrl ?? ''}
                onChange={(e) => handleFieldChange(video.id, 'thumbnailUrl', e.target.value)}
                placeholder="Thumbnail URL"
                className="px-2 py-1.5 border border-gray-300 rounded text-sm"
              />
              <input
                value={video.videoUrl ?? ''}
                onChange={(e) => handleFieldChange(video.id, 'videoUrl', e.target.value)}
                placeholder="Video embed URL"
                className="px-2 py-1.5 border border-gray-300 rounded text-sm col-span-2"
              />
            </div>
            <button
              onClick={() => handleSave(video)}
              className="text-xs px-3 py-1.5 bg-[#C15AB3] text-white rounded font-medium"
            >
              Save
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="flex items-center gap-1 px-4 py-2 bg-white border border-[#C15AB3] text-[#C15AB3] rounded-lg text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Add video
      </button>
    </div>
  );
}
