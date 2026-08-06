import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { listAllArticlesForAdmin, listProducts } from '../../lib/content';

export default function AdminDashboard() {
  const [stats, setStats] = useState<{ products: number; articles: number; drafts: number } | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const [products, articles] = await Promise.all([listProducts(), listAllArticlesForAdmin()]);
      setStats({
        products: products.length,
        articles: articles.length,
        drafts: articles.filter((a) => a.status === 'DRAFT').length,
      });
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Products" value={stats?.products} />
        <StatCard label="Total articles" value={stats?.articles} />
        <StatCard label="Drafts" value={stats?.drafts} />
      </div>
      <div className="flex gap-4">
        <Link
          to="/admin/articles/new"
          className="px-5 py-2.5 bg-[#C15AB3] text-white rounded-lg font-medium hover:bg-[#C15AB3]/90"
        >
          + New article
        </Link>
        <Link
          to="/admin/taxonomy"
          className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-[#C15AB3]"
        >
          Manage products & sections
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value?: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value ?? '—'}</p>
    </div>
  );
}
