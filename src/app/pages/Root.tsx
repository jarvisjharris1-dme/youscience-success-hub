import { Outlet } from 'react-router';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export default function Root() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
