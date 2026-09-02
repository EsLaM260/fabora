import { Outlet } from 'react-router-dom';
import AnnouncementBar from '../component/layout/AnnouncementBar';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <AnnouncementBar />
      <Header />
      <main className="site-motion">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
