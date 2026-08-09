import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import '../../../app/lib/amplifyClient'; // ensures Amplify.configure() has run
import { LayoutDashboard, FileText, FolderTree, Video, Presentation, LogOut } from 'lucide-react';

function InnerAdminLayout() {
  const { user, signOut } = useAuthenticator((ctx) => [ctx.user]);
  const location = useLocation();
  const [isEditor, setIsEditor] = useState<boolean | null>(null);

  useEffect(() => {
    fetchAuthSession().then((session) => {
      const groups = (session.tokens?.accessToken?.payload['cognito:groups'] as string[]) ?? [];
      setIsEditor(groups.includes('ContentEditors'));
    });
  }, [user]);

  if (isEditor === null) {
    return <div className="p-8 text-gray-500">Checking permissions…</div>;
  }

  if (!isEditor) {
    return (
      <div className="max-w-lg mx-auto mt-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access pending</h1>
        <p className="text-gray-600 mb-6">
          Your account ({user?.signInDetails?.loginId}) is signed in, but hasn't been added to the
          ContentEditors group yet. Ask an AWS admin to add you in the Cognito console — see
          SETUP.md, "Adding an editor".
        </p>
        <button onClick={signOut} className="text-[#C15AB3] font-medium">
          Sign out
        </button>
      </div>
    );
  }

  const navItem = (to: string, label: string, Icon: any) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${
          active ? 'bg-[#C15AB3] text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5" />
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-200">
          <p className="font-bold text-gray-900">Success Hub Admin</p>
          <p className="text-sm text-gray-500 truncate">{user?.signInDetails?.loginId}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItem('/admin', 'Dashboard', LayoutDashboard)}
          {navItem('/admin/articles', 'Articles', FileText)}
          {navItem('/admin/taxonomy', 'Products & Sections', FolderTree)}
          {navItem('/admin/support-tv', 'Support TV', Video)}
          {navItem('/admin/webinars', 'Training Webinars', Presentation)}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
          <Link to="/" className="block mt-3 text-sm text-[#C15AB3] font-medium">
            ← Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <Authenticator hideSignUp>
      <InnerAdminLayout />
    </Authenticator>
  );
}
