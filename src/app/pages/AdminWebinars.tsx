import { useEffect, useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { client } from '../../lib/amplifyClient';
import {
  createWebinarLink,
  createWebinarSection,
  deleteWebinarLink,
  deleteWebinarSection,
  listAllArticlesForAdmin,
  listWebinarLinksForSection,
  listWebinarSections,
} from '../../lib/content';

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminWebinars() {
  const [sections, setSections] = useState<any[]>([]);
  const [linksBySection, setLinksBySection] = useState<Record<string, any[]>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [articles, setArticles] = useState<any[]>([]);
  const [newLink, setNewLink] = useState<
    Record<string, { title: string; mode: 'article' | 'external'; articleId: string; externalUrl: string }>
  >({});

  async function refreshSections() {
    setSections(await listWebinarSections());
  }

  useEffect(() => {
    refreshSections();
    listAllArticlesForAdmin().then(setArticles);
  }, []);

  async function toggleExpand(sectionId: string) {
    if (expanded === sectionId) {
      setExpanded(null);
      return;
    }
    setExpanded(sectionId);
    setLinksBySection((prev) => ({ ...prev, [sectionId]: [] }));
    const links = await listWebinarLinksForSection(sectionId);
    setLinksBySection((prev) => ({ ...prev, [sectionId]: links }));
  }

  async function handleAddSection() {
    if (!newSectionTitle.trim()) return;
    const { errors } = await createWebinarSection({ slug: slugify(newSectionTitle), title: newSectionTitle, sortOrder: sections.length });
    if (errors) {
      alert('Failed to add section: ' + errors.map((e) => e.message).join(', '));
      return;
    }
    setNewSectionTitle('');
    refreshSections();
  }

  async function handleDeleteSection(id: string, title: string) {
    if (!confirm(`Delete section "${title}" and its links?`)) return;
    const { errors } = await deleteWebinarSection(id);
    if (errors) {
      alert('Failed to delete section: ' + errors.map((e) => e.message).join(', '));
      return;
    }
    refreshSections();
  }

  async function handleAddLink(sectionId: string) {
    const draft = newLink[sectionId];
    if (!draft?.title.trim()) return;
    const existing = linksBySection[sectionId] ?? [];
    const { errors } = await createWebinarLink({
      title: draft.title,
      sectionId,
      sortOrder: existing.length,
      externalUrl: draft.mode === 'external' ? draft.externalUrl : undefined,
      linkedArticleId: draft.mode === 'article' ? draft.articleId : undefined,
    });
    if (errors) {
      alert('Failed to add link: ' + errors.map((e) => e.message).join(', '));
      return;
    }
    setNewLink((prev) => ({ ...prev, [sectionId]: { title: '', mode: 'article', articleId: '', externalUrl: '' } }));
    const links = await listWebinarLinksForSection(sectionId);
    setLinksBySection((prev) => ({ ...prev, [sectionId]: links }));
  }

  async function handleDeleteLink(sectionId: string, id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    const { errors } = await deleteWebinarLink(id);
    if (errors) {
      alert('Failed to delete link: ' + errors.map((e) => e.message).join(', '));
      return;
    }
    const links = await listWebinarLinksForSection(sectionId);
    setLinksBySection((prev) => ({ ...prev, [sectionId]: links }));
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Training Webinars</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Add a new section</p>
        <div className="flex gap-2">
          <input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Section name (e.g. Live webinars)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button
            onClick={handleAddSection}
            className="flex items-center gap-1 px-4 py-2 bg-[#C15AB3] text-white rounded-lg text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section) => {
          const draft = newLink[section.id] ?? { title: '', mode: 'article' as const, articleId: '', externalUrl: '' };
          return (
            <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleExpand(section.id)}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                <span className="flex items-center gap-2 font-medium text-gray-900">
                  {expanded === section.id ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  {section.title}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSection(section.id, section.title);
                  }}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </span>
              </button>

              {expanded === section.id && (
                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                  <ul className="space-y-2 mb-3">
                    {(linksBySection[section.id] ?? []).map((link) => (
                      <li key={link.id} className="flex items-center justify-between text-sm bg-white rounded px-3 py-2 border border-gray-200">
                        <span className="text-gray-700">
                          {link.title}{' '}
                          <span className="text-xs text-gray-400">
                            {link.externalUrl ? '(external link)' : link.linkedArticleId ? '(linked article)' : '(no link set)'}
                          </span>
                        </span>
                        <button
                          onClick={() => handleDeleteLink(section.id, link.id, link.title)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                    {(linksBySection[section.id] ?? []).length === 0 && (
                      <li className="text-sm text-gray-400">No items yet.</li>
                    )}
                  </ul>

                  <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
                    <input
                      value={draft.title}
                      onChange={(e) =>
                        setNewLink((prev) => ({ ...prev, [section.id]: { ...draft, title: e.target.value } }))
                      }
                      placeholder="Link title"
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                    />
                    <div className="flex items-center gap-3 text-sm">
                      <label className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          checked={draft.mode === 'article'}
                          onChange={() => setNewLink((prev) => ({ ...prev, [section.id]: { ...draft, mode: 'article' } }))}
                        />
                        Link to an article
                      </label>
                      <label className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          checked={draft.mode === 'external'}
                          onChange={() => setNewLink((prev) => ({ ...prev, [section.id]: { ...draft, mode: 'external' } }))}
                        />
                        External URL
                      </label>
                    </div>
                    {draft.mode === 'article' ? (
                      <select
                        value={draft.articleId}
                        onChange={(e) =>
                          setNewLink((prev) => ({ ...prev, [section.id]: { ...draft, articleId: e.target.value } }))
                        }
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="">Select an article…</option>
                        {articles.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.title}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={draft.externalUrl}
                        onChange={(e) =>
                          setNewLink((prev) => ({ ...prev, [section.id]: { ...draft, externalUrl: e.target.value } }))
                        }
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                      />
                    )}
                    <button
                      onClick={() => handleAddLink(section.id)}
                      className="px-3 py-1.5 bg-[#C15AB3] text-white rounded-lg text-sm font-medium"
                    >
                      Add link
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
