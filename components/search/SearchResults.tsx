'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import ContentGrid from '../content/ContentGrid';

export default function SearchResults() {
  const { results, loading, error, query } = useAppSelector(
    (state) => state.search
  );

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Start Searching
        </h3>
        <p className="text-gray-600 text-center">
          Use the search bar above to find news, movies, and social posts
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Search Results for &quot;{query}&quot;
        </h2>
        <p className="text-gray-600 mt-1">
          {!loading && results.length > 0 && `Found ${results.length} results`}
        </p>
      </div>

      <ContentGrid items={results} loading={loading} error={error} />
    </div>
  );
}
