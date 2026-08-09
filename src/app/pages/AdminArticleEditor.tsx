import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExt from '@tiptap/extension-image';
import LinkExt from '@tiptap/extension-link';
import { client } from '../../lib/amplifyClient';
import { createArticle, updateArticle } from '../../lib/content';
import EditorToolbar from './EditorToolbar';

type ProductRow = { id: string; title: string };
type CategoryRow = { id: string; title: string; productId: string };

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminArticleEditor() {
  const { articleId } = useParams();
  const isNew = !articleId || articleId === 'new';
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [productId, setProductId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [subheading, setSubheading] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [isQuickStartGuide, setIsQuickStartGuide] = useState(false);
  const [legacyUrl, setLegacyUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(isNew);

  const editor = useEditor({
    extensions: [StarterKit, ImageExt, LinkExt.configure({ openOnClick: false })],
    content: '<p></p>',
  });

  // Load products for the dropdown
  useEffect(() => {
    client.models.Product.list().then(({ data }) => setProducts(data ?? []));
  }, []);

  // Load categories whenever the selected product changes
  useEffect(() => {
    if (!productId) {
      setCategories([]);
      return;
    }
    client.models.Category.list({ filter: { productId: { eq: productId } } }).then(({ data }) =>
      setCategories(data ?? [])
    );
  }, [productId]);

  // Load existing article when editing
  useEffect(() => {
    if (isNew || !articleId) return;
    client.models.Article.get({ id: articleId }).then(async ({ data: article }) => {
      if (!article) return;
      setTitle(article.title);
      setSlug(article.slug);
      setSlugTouched(true);
      setSubheading(article.subheading ?? '');
      setReadTime(article.readTime ?? '');
      setStatus((article.status as 'DRAFT' | 'PUBLISHED') ?? 'DRAFT');
      setIsQuickStartGuide(!!article.isQuickStartGuide);
      setLegacyUrl(article.legacyHelpCenterUrl ?? '');
      setCategoryId(article.categoryId);
      editor?.commands.setContent(article.contentHtml || '<p></p>');

      const { data: category } = await client.models.Category.get({ id: article.categoryId });
      if (category) setProductId(category.productId);
      setLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, editor]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSave() {
    if (!title.trim() || !categoryId) {
      alert('Title and section are required.');
      return;
    }
    setSaving(true);
    const contentHtml = editor?.getHTML() ?? '';
    try {
      if (isNew) {
        const { data, errors } = await createArticle({
          slug: slug || slugify(title),
          title,
          subheading,
          contentHtml,
          readTime,
          status,
          categoryId,
          isQuickStartGuide,
          legacyHelpCenterUrl: legacyUrl,
        });
        if (errors) throw errors;
        navigate(`/admin/articles/${data?.id}`);
      } else {
        const { errors } = await updateArticle({
          id: articleId!,
          slug: slug || slugify(title),
          title,
          subheading,
          contentHtml,
          readTime,
          status,
          categoryId,
          isQuickStartGuide,
          legacyHelpCenterUrl: legacyUrl,
        });
        if (errors) throw errors;
      }
    } catch (err) {
      console.error(err);
      alert('Save failed — check the console for details.');
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) return <div className="text-gray-500">Loading article…</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isNew ? 'New article' : 'Edit article'}
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Title">
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </Field>
        <Field label="URL slug">
          <input
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Product">
          <select
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
              setCategoryId('');
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select a product…</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Section">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={!productId}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
          >
            <option value="">Select a section…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Field label="Subheading (optional)">
          <input
            value={subheading}
            onChange={(e) => setSubheading(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </Field>
        <Field label="Read time">
          <input
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </Field>
        <Field label="Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </Field>
      </div>

      <Field label="Legacy Help Center URL (optional, for reference only)">
        <input
          value={legacyUrl}
          onChange={(e) => setLegacyUrl(e.target.value)}
          placeholder="https://youscience.my.site.com/helpcenter/s/article/..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4"
        />
      </Field>

      <label className="flex items-center gap-2 mb-4 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={isQuickStartGuide}
          onChange={(e) => setIsQuickStartGuide(e.target.checked)}
          className="rounded border-gray-300"
        />
        Show on the Quick Start Guides page
      </label>

      <label className="block text-sm font-medium text-gray-700 mb-1.5">Article content</label>
      <EditorToolbar editor={editor} />
      <div className="border border-gray-300 rounded-b-lg px-4 py-3 min-h-[300px] prose max-w-none focus-within:ring-2 focus-within:ring-[#C15AB3]">
        <EditorContent editor={editor} />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#C15AB3] text-white rounded-lg font-medium hover:bg-[#C15AB3]/90 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          onClick={() => navigate('/admin/articles')}
          className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
