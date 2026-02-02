import DashboardLayout from '@/components/layout/DashboardLayout';
import PreferencesPanel from '@/components/settings/PreferencesPanel';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="container-custom py-8 dark:bg-gray-200">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your content preferences and personalize your dashboard experience
            </p>
          </div>

          <PreferencesPanel />

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              💡 Pro Tip
            </h3>
            <p className="text-sm text-blue-800">
              Your preferences are automatically saved and will persist across sessions. 
              Select multiple categories to get a diverse mix of content in your feed!
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
