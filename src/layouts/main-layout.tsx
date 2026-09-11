import { Outlet } from 'react-router-dom';
import AnnouncementBar from '../components/layout/announcement-bar';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

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
