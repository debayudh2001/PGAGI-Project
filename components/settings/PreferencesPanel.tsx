'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { toggleNewsCategory, toggleMovieGenre } from '@/lib/redux/slices/userSlice';
import { NewsCategory, MovieGenre } from '@/types/content';
import { NEWS_CATEGORIES, MOVIE_GENRES } from '@/lib/utils/constants';

export default function PreferencesPanel() {
  const dispatch = useAppDispatch();
  const { newsCategories, movieGenres } = useAppSelector((state) => state.user.preferences);

  const handleToggleNewsCategory = (category: NewsCategory) => {
    dispatch(toggleNewsCategory(category));
  };

  const handleToggleMovieGenre = (genre: MovieGenre) => {
    dispatch(toggleMovieGenre(genre));
  };

  return (
    <div className="space-y-8">
      {/* News Categories Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            News Categories
          </h3>
          <p className="text-sm text-gray-600">
            Select news categories you&apos;re interested in
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {NEWS_CATEGORIES.map((category) => {
            const isSelected = newsCategories.includes(category.value);
            
            return (
              <button
                key={category.value}
                onClick={() => handleToggleNewsCategory(category.value)}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-primary-500 border-primary-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      isSelected ? 'text-primary-900' : 'text-gray-700'
                    }`}
                  >
                    {category.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {newsCategories.length} {newsCategories.length === 1 ? 'category' : 'categories'} selected
            </span>
          </div>
        </div>
      </div>

      {/* Movie Genres Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Movie Genres
          </h3>
          <p className="text-sm text-gray-600">
            Select movie genres you&apos;d like to see
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {MOVIE_GENRES.map((genre) => {
            const isSelected = movieGenres.includes(genre.value);
            
            return (
              <button
                key={genre.value}
                onClick={() => handleToggleMovieGenre(genre.value)}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-primary-500 border-primary-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      isSelected ? 'text-primary-900' : 'text-gray-700'
                    }`}
                  >
                    {genre.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {movieGenres.length} {movieGenres.length === 1 ? 'genre' : 'genres'} selected
            </span>
          </div>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              Auto-Save Enabled
            </h4>
            <p className="text-sm text-blue-800">
              Your preferences are automatically saved and will personalize your feed immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

