'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import ContentGrid from '../content/ContentGrid';

export default function FavoritesSection() {
  const { favorites } = useAppSelector((state) => state.user.preferences);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-black">Your Favorites</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Content you&apos;ve saved for later ({favorites.length} items)
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed dark:border-gray-700">
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Favorites Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-4 max-w-md">
            Start adding content to your favorites by clicking the heart icon on any content card
          </p>
          <a href="/" className="btn-primary">
            Browse Content
          </a>
        </div>
      ) : (
        <ContentGrid items={favorites} />
      )}
    </div>
  );
}
