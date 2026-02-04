'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchPersonalizedFeed, loadMoreContent } from '@/lib/redux/slices/contentSlice';
import { setFeedOrder, resetFeedOrder } from '@/lib/redux/slices/userSlice';
import { ContentItem } from '@/types/content';
import ContentGrid from '../content/ContentGrid';

export default function PersonalizedFeed() {
  const dispatch = useAppDispatch();
  const { feed, loading, error, hasMore } = useAppSelector((state) => state.content);
  const { newsCategories, movieGenres, feedOrder } = useAppSelector((state) => state.user.preferences);

  const [localFeed, setLocalFeed] = useState<ContentItem[]>([]);
  const hasPreferences = newsCategories.length > 0 || movieGenres.length > 0;
  const hasCustomOrder = feedOrder && feedOrder.length > 0;

  // Apply custom order to feed
  useEffect(() => {
    if (!feedOrder || feedOrder.length === 0) {
      setLocalFeed(feed);
      return;
    }

    // Create a map for quick lookup
    const feedMap = new Map(feed.map(item => [item.id, item]));
    
    // Build ordered feed based on feedOrder
    const orderedFeed: ContentItem[] = [];
    const addedIds = new Set<string>();

    // First, add items in custom order
    feedOrder.forEach(id => {
      const item = feedMap.get(id);
      if (item) {
        orderedFeed.push(item);
        addedIds.add(id);
      }
    });

    // Then, add any new items not in the custom order
    feed.forEach(item => {
      if (!addedIds.has(item.id)) {
        orderedFeed.push(item);
      }
    });

    setLocalFeed(orderedFeed);
  }, [feed, feedOrder]);

  useEffect(() => {
    // Fetch feed when component mounts or preferences change
    if (hasPreferences) {
      dispatch(fetchPersonalizedFeed());
    }
  }, [dispatch, newsCategories, movieGenres, hasPreferences]);

  const handleLoadMore = () => {
    dispatch(loadMoreContent());
  };

  const handleReorder = useCallback((reorderedItems: ContentItem[]) => {
    setLocalFeed(reorderedItems);
    // Save the new order as IDs
    const newOrder = reorderedItems.map(item => item.id);
    dispatch(setFeedOrder(newOrder));
  }, [dispatch]);

  const handleResetOrder = () => {
    dispatch(resetFeedOrder());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-black">Your Personalized Feed</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Content tailored to your interests and preferences
            {hasCustomOrder && <span className="text-primary-600 dark:text-primary-400"> • Custom order active</span>}
          </p>
        </div>
        <div className="flex gap-2">
          {hasCustomOrder && (
            <button
              onClick={handleResetOrder}
              className="btn-secondary flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
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
              Reset Order
            </button>
          )}
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
      </div>

      {!hasPreferences ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Preferences Selected
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-4 max-w-md">
            Get started by selecting news categories and movie genres in settings to see personalized content
          </p>
          <a href="/settings" className="btn-primary">
            Go to Settings
          </a>
        </div>
      ) : (
        <ContentGrid
          items={localFeed}
          loading={loading}
          error={error}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          enableDragAndDrop={true}
          onReorder={handleReorder}
        />
      )}
    </div>
  );
}
