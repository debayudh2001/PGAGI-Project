import DashboardLayout from '@/components/layout/DashboardLayout';
import TrendingSection from '@/components/sections/TrendingSection';

export default function TrendingPage() {
  return (
    <DashboardLayout>
      <div className="container-custom py-8 dark:bg-gray-200">
        <TrendingSection />
      </div>
    </DashboardLayout>
  );
}
