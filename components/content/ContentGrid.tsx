'use client';

import { ContentItem } from '@/types/content';
import ContentCard from './ContentCard';

interface ContentGridProps {
  items: ContentItem[];
  loading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export default function ContentGrid({
  items,
  loading = false,
  error = null,
  onLoadMore,
  hasMore = false,
}: ContentGridProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 fade-in">
        <svg
          className="w-12 h-12 text-red-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Loading Content</h3>
        <p className="text-gray-600 dark:text-gray-400 text-center">{error}</p>
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 fade-in">
        <svg
          className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Content Found</h3>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Try adjusting your preferences or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={item.id} className="stagger-fade-in">
            <ContentCard content={item} />
          </div>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="card overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 skeleton-shimmer"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton-shimmer rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 skeleton-shimmer rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton-shimmer rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton-shimmer rounded w-5/6"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 skeleton-shimmer rounded w-1/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 skeleton-shimmer rounded w-1/4"></div>
                </div>
                <div className="h-8 bg-gray-300 dark:bg-gray-700 skeleton-shimmer rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && onLoadMore && (
        <div className="flex justify-center pt-6 fade-in">
          <button
            onClick={onLoadMore}
            className="btn-primary px-8 py-3 flex items-center gap-2"
          >
            <span>Load More</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
