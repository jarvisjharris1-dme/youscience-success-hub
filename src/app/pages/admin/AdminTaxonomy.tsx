import { useEffect, useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { client } from '../../lib/amplifyClient';
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  listCategoriesForProduct,
  listProducts,
} from '../../lib/content';
import { availableIconKeys } from '../../lib/iconMap';

type ProductRow = Awaited<ReturnType<typeof listProducts>>[number];
type CategoryRow = Awaited<ReturnType<typeof listCategoriesForProduct>>[number];

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminTaxonomy() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [categoriesByProduct, setCategoriesByProduct] = useState<Record<string, CategoryRow[]>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newProductTitle, setNewProductTitle] = useState('');
  const [newProductIcon, setNewProductIcon] = useState(availableIconKeys[0]);
  const [newCategoryTitle, setNewCategoryTitle] = useState<Record<string, string>>({});

  async function refreshProducts() {
    setProducts(await listProducts());
  }

  useEffect(() => {
    refreshProducts();
  }, []);

  async function toggleExpand(productId: string) {
    if (expanded === productId) {
      setExpanded(null);
      return;
    }
    setExpanded(productId);
    if (!categoriesByProduct[productId]) {
      const cats = await listCategoriesForProduct(productId);
      setCategoriesByProduct((prev) => ({ ...prev, [productId]: cats }));
    }
  }

  async function handleAddProduct() {
    if (!newProductTitle.trim()) return;
    await createProduct({
      slug: slugify(newProductTitle),
      title: newProductTitle,
      iconKey: newProductIcon,
      sortOrder: products.length,
    });
    setNewProductTitle('');
    refreshProducts();
  }

  async function handleDeleteProduct(id: string, title: string) {
    if (!confirm(`Delete product "${title}" and all its sections? Articles inside won't be deleted automatically — move or remove them first.`))
      return;
    await deleteProduct(id);
    refreshProducts();
  }

  async function handleAddCategory(productId: string) {
    const title = newCategoryTitle[productId];
    if (!title?.trim()) return;
    const existing = categoriesByProduct[productId] ?? [];
    await createCategory({
      slug: slugify(title),
      title,
      productId,
      sortOrder: existing.length,
    });
    setNewCategoryTitle((prev) => ({ ...prev, [productId]: '' }));
    const cats = await listCategoriesForProduct(productId);
    setCategoriesByProduct((prev) => ({ ...prev, [productId]: cats }));
  }

  async function handleDeleteCategory(productId: string, categoryId: string, title: string) {
    if (!confirm(`Delete section "${title}"? Articles inside won't be deleted automatically.`)) return;
    await deleteCategory(categoryId);
    const cats = await listCategoriesForProduct(productId);
    setCategoriesByProduct((prev) => ({ ...prev, [productId]: cats }));
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Products & Sections</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Add a new product</p>
        <div className="flex gap-2">
          <input
            value={newProductTitle}
            onChange={(e) => setNewProductTitle(e.target.value)}
            placeholder="Product name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <select
            value={newProductIcon}
            onChange={(e) => setNewProductIcon(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {availableIconKeys.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-1 px-4 py-2 bg-[#C15AB3] text-white rounded-lg text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleExpand(p.id)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <span className="flex items-center gap-2 font-medium text-gray-900">
                {expanded === p.id ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                {p.title}
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProduct(p.id, p.title);
                }}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </span>
            </button>
            {expanded === p.id && (
              <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                <ul className="space-y-2 mb-3">
                  {(categoriesByProduct[p.id] ?? []).map((c) => (
                    <li key={c.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{c.title}</span>
                      <button
                        onClick={() => handleDeleteCategory(p.id, c.id, c.title)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                  {(categoriesByProduct[p.id] ?? []).length === 0 && (
                    <li className="text-sm text-gray-400">No sections yet.</li>
                  )}
                </ul>
                <div className="flex gap-2">
                  <input
                    value={newCategoryTitle[p.id] ?? ''}
                    onChange={(e) =>
                      setNewCategoryTitle((prev) => ({ ...prev, [p.id]: e.target.value }))
                    }
                    placeholder="New section name"
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => handleAddCategory(p.id)}
                    className="px-3 py-1.5 bg-white border border-[#C15AB3] text-[#C15AB3] rounded-lg text-sm font-medium"
                  >
                    Add section
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
