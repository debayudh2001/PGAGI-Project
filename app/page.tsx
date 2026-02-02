import DashboardLayout from '@/components/layout/DashboardLayout';
import PersonalizedFeed from '@/components/sections/PersonalizedFeed';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="container-custom py-8 dark:bg-gray-200 min-h-screen">
        <PersonalizedFeed />
      </div>
    </DashboardLayout>
  );
}
