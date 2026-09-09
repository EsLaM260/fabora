import { Outlet } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

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
