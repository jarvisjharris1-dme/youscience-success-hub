import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Plus, Trash2, ChevronDown, ChevronRight, ListVideo } from 'lucide-react';
import {
  createSupportTVCategory,
  createSupportTVItem,
  deleteSupportTVCategory,
  deleteSupportTVItem,
  listSupportTVCategories,
  listSupportTVItemsForCategory,
  updateSupportTVItem,
} from '../../lib/content';

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminSupportTV() {
  const [categories, setCategories] = useState<any[]>([]);
  const [itemsByCategory, setItemsByCategory] = useState<Record<string, any[]>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newItem, setNewItem] = useState<Record<string, { title: string; type: 'VIDEO' | 'PLAYLIST' }>>({});

  async function refreshCategories() {
    setCategories(await listSupportTVCategories());
  }

  useEffect(() => {
    refreshCategories();
  }, []);

  async function toggleExpand(categoryId: string) {
    if (expanded === categoryId) {
      setExpanded(null);
      return;
    }
    setExpanded(categoryId);
    const items = await listSupportTVItemsForCategory(categoryId, false);
    setItemsByCategory((prev) => ({ ...prev, [categoryId]: items }));
  }

  async function handleAddCategory() {
    if (!newCategoryTitle.trim()) return;
    const { errors } = await createSupportTVCategory({
      slug: slugify(newCategoryTitle),
      title: newCategoryTitle,
      sortOrder: categories.length,
    });
    if (errors) {
      alert('Failed to add category: ' + errors.map((e) => e.message).join(', '));
      return;
    }
    setNewCategoryTitle('');
    refreshCategories();
  }

  async function handleDeleteCategory(id: string, title: string) {
    if (!confirm(`Delete category "${title}" and everything in it?`)) return;
    const { errors } = await deleteSupportTVCategory(id);
    if (errors) {
      alert('Failed to delete category: ' + errors.map((e) => e.message).join(', '));
      return;
    }
    refreshCategories();
  }

  async function handleAddItem(categoryId: string) {
    const draft = newItem[categoryId];
    if (!draft?.title.trim()) return;
    const existing = itemsByCategory[categoryId] ?? [];
    const { errors } = await createSupportTVItem({
      slug: slugify(draft.title),
      title: draft.title,
      type: draft.type,
      status: 'DRAFT',
      categoryId,
      sortOrder: existing.length,
    });
    if (errors) {
      alert('Failed to add item: ' + errors.map((e) => e.message).join(', '));
      return;
    }
    setNewItem((prev) => ({ ...prev, [categoryId]: { title: '', type: 'VIDEO' } }));
    const items = await listSupportTVItemsForCategory(categoryId, false);
    setItemsByCategory((prev) => ({ ...prev, [categoryId]: items }));
  }

  async function handleDeleteItem(categoryId: string, id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await deleteSupportTVItem(id);
    const items = await listSupportTVItemsForCategory(categoryId, false);
    setItemsByCategory((prev) => ({ ...prev, [categoryId]: items }));
  }

  async function handleFieldChange(categoryId: string, itemId: string, field: string, value: any) {
    setItemsByCategory((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].map((it) => (it.id === itemId ? { ...it, [field]: value } : it)),
    }));
  }

  async function handleSaveItem(item: any) {
    const { errors } = await updateSupportTVItem({
      id: item.id,
      title: item.title,
      description: item.description,
      thumbnailUrl: item.thumbnailUrl,
      duration: item.duration,
      videoUrl: item.videoUrl,
      featuredOnHome: item.featuredOnHome,
      status: item.status,
    });
    if (errors) {
      alert('Failed to save: ' + errors.map((e) => e.message).join(', '));
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support TV</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Add a new category</p>
        <div className="flex gap-2">
          <input
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
            placeholder="Category name (e.g. Getting Started)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button
            onClick={handleAddCategory}
            className="flex items-center gap-1 px-4 py-2 bg-[#C15AB3] text-white rounded-lg text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleExpand(cat.id)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <span className="flex items-center gap-2 font-medium text-gray-900">
                {expanded === cat.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                {cat.title}
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory(cat.id, cat.title);
                }}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </span>
            </button>

            {expanded === cat.id && (
              <div className="border-t border-gray-100 px-4 py-4 bg-gray-50 space-y-4">
                {(itemsByCategory[cat.id] ?? []).map((item) => (
                  <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{item.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {item.type}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(cat.id, item.id, item.title)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        value={item.description ?? ''}
                        onChange={(e) => handleFieldChange(cat.id, item.id, 'description', e.target.value)}
                        placeholder="Description"
                        className="px-2 py-1.5 border border-gray-300 rounded text-sm"
                      />
                      <input
                        value={item.duration ?? ''}
                        onChange={(e) => handleFieldChange(cat.id, item.id, 'duration', e.target.value)}
                        placeholder="Duration label (e.g. 12 min)"
                        className="px-2 py-1.5 border border-gray-300 rounded text-sm"
                      />
                      <input
                        value={item.thumbnailUrl ?? ''}
                        onChange={(e) => handleFieldChange(cat.id, item.id, 'thumbnailUrl', e.target.value)}
                        placeholder="Thumbnail image URL"
                        className="px-2 py-1.5 border border-gray-300 rounded text-sm col-span-2"
                      />
                      {item.type === 'VIDEO' && (
                        <input
                          value={item.videoUrl ?? ''}
                          onChange={(e) => handleFieldChange(cat.id, item.id, 'videoUrl', e.target.value)}
                          placeholder="Video embed URL (e.g. YouTube embed link)"
                          className="px-2 py-1.5 border border-gray-300 rounded text-sm col-span-2"
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1.5 text-xs text-gray-600">
                          <input
                            type="checkbox"
                            checked={!!item.featuredOnHome}
                            onChange={(e) => handleFieldChange(cat.id, item.id, 'featuredOnHome', e.target.checked)}
                          />
                          Feature on homepage
                        </label>
                        <select
                          value={item.status}
                          onChange={(e) => handleFieldChange(cat.id, item.id, 'status', e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="DRAFT">Draft</option>
                          <option value="PUBLISHED">Published</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.type === 'PLAYLIST' && (
                          <Link
                            to={`/admin/support-tv/${item.id}/videos`}
                            className="flex items-center gap-1 text-xs text-[#C15AB3] font-medium"
                          >
                            <ListVideo className="w-3.5 h-3.5" />
                            Manage videos
                          </Link>
                        )}
                        <button
                          onClick={() => handleSaveItem(item)}
                          className="text-xs px-3 py-1.5 bg-[#C15AB3] text-white rounded font-medium"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-2">
                  <input
                    value={newItem[cat.id]?.title ?? ''}
                    onChange={(e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        [cat.id]: { title: e.target.value, type: prev[cat.id]?.type ?? 'VIDEO' },
                      }))
                    }
                    placeholder="New item title"
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                  />
                  <select
                    value={newItem[cat.id]?.type ?? 'VIDEO'}
                    onChange={(e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        [cat.id]: { title: prev[cat.id]?.title ?? '', type: e.target.value as 'VIDEO' | 'PLAYLIST' },
                      }))
                    }
                    className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="VIDEO">Single video</option>
                    <option value="PLAYLIST">Playlist</option>
                  </select>
                  <button
                    onClick={() => handleAddItem(cat.id)}
                    className="px-3 py-1.5 bg-white border border-[#C15AB3] text-[#C15AB3] rounded-lg text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
