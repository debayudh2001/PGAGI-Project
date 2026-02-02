'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchPersonalizedFeed, loadMoreContent } from '@/lib/redux/slices/contentSlice';
import ContentGrid from '../content/ContentGrid';

export default function PersonalizedFeed() {
  const dispatch = useAppDispatch();
  const { feed, loading, error, hasMore } = useAppSelector((state) => state.content);
  const { newsCategories, movieGenres } = useAppSelector((state) => state.user.preferences);

  const hasPreferences = newsCategories.length > 0 || movieGenres.length > 0;

  useEffect(() => {
    // Fetch feed when component mounts or preferences change
    if (hasPreferences) {
      dispatch(fetchPersonalizedFeed());
    }
  }, [dispatch, newsCategories, movieGenres, hasPreferences]);

  const handleLoadMore = () => {
    dispatch(loadMoreContent());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Personalized Feed</h2>
          <p className="text-gray-600 mt-1">
            Content tailored to your interests and preferences
          </p>
        </div>
        {hasPreferences && (
          <button
            onClick={() => dispatch(fetchPersonalizedFeed())}
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
        )}
      </div>

      {!hasPreferences ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border-2 border-dashed">
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Preferences Selected
          </h3>
          <p className="text-gray-600 text-center mb-4 max-w-md">
            Get started by selecting news categories and movie genres in settings to see personalized content
          </p>
          <a href="/settings" className="btn-primary">
            Go to Settings
          </a>
        </div>
      ) : (
        <ContentGrid
          items={feed}
          loading={loading}
          error={error}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      )}
    </div>
  );
}
