import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchResults from '@/components/search/SearchResults';

export default function SearchPage() {
  return (
    <DashboardLayout>
      <div className="container-custom py-8 dark:bg-gray-200 min-h-screen">
        <SearchResults />
      </div>
    </DashboardLayout>
  );
}
