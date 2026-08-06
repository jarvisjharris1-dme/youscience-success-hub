import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Plus, Search, Trash2, Pencil } from 'lucide-react';
import { client } from '../../lib/amplifyClient';
import { deleteArticle, listAllArticlesForAdmin } from '../../lib/content';

type ArticleRow = Awaited<ReturnType<typeof listAllArticlesForAdmin>>[number];

export default function AdminArticleList() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [categoryTitles, setCategoryTitles] = useState<Record<string, string>>({});
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const data = await listAllArticlesForAdmin();
    setArticles(data);
    const { data: categories } = await client.models.Category.list();
    setCategoryTitles(Object.fromEntries((categories ?? []).map((c) => [c.id, c.title])));
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    await deleteArticle(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
        <Link
          to="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#C15AB3] text-white rounded-lg font-medium hover:bg-[#C15AB3]/90"
        >
          <Plus className="w-4 h-4" />
          New article
        </Link>
      </div>

      <div className="relative mb-4 max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Section</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td className="px-4 py-6 text-gray-400" colSpan={4}>
                  Loading…
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-400" colSpan={4}>
                  No articles found.
                </td>
              </tr>
            )}
            {filtered.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3 font-medium text-gray-900">{a.title}</td>
                <td className="px-4 py-3 text-gray-600">{categoryTitles[a.categoryId] ?? '—'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      a.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {a.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link
                    to={`/admin/articles/${a.id}`}
                    className="inline-flex items-center gap-1 text-[#C15AB3] font-medium mr-4"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(a.id, a.title)}
                    className="inline-flex items-center gap-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
