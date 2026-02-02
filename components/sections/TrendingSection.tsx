'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchTrendingContent } from '@/lib/redux/slices/contentSlice';
import ContentGrid from '../content/ContentGrid';

export default function TrendingSection() {
  const dispatch = useAppDispatch();
  const { trending, loading, error } = useAppSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchTrendingContent());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <p className="text-gray-600 mt-1">
            Popular content across all categories
          </p>
        </div>
        <button
          onClick={() => dispatch(fetchTrendingContent())}
          disabled={loading}
          className="btn-secondary flex items-center gap-2"
        >
          <svg
            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      <ContentGrid items={trending} loading={loading} error={error} />
    </div>
  );
}
