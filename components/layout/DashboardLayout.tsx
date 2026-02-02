'use client';

import { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAppDispatch } from '@/lib/redux/hooks';
import { loadUserPreferences } from '@/lib/redux/slices/userSlice';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useAppDispatch();

  // Load user preferences from localStorage on mount
  useEffect(() => {
    dispatch(loadUserPreferences());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
