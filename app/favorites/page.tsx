import DashboardLayout from '@/components/layout/DashboardLayout';
import FavoritesSection from '@/components/sections/FavoritesSection';

export default function FavoritesPage() {
  return (
    <DashboardLayout>
      <div className="container-custom py-8 dark:bg-gray-200 min-h-screen">
        <FavoritesSection />
      </div>
    </DashboardLayout>
  );
}
