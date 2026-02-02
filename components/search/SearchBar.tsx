'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setSearchQuery, searchContent } from '@/lib/redux/slices/searchSlice';
import { debounce } from '@/lib/utils/debounce';
import { SEARCH_DEBOUNCE_DELAY } from '@/lib/utils/constants';

export default function SearchBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { query, loading } = useAppSelector((state) => state.search);
  const [localQuery, setLocalQuery] = useState(query);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        dispatch(searchContent(searchQuery));
      }
    }, SEARCH_DEBOUNCE_DELAY),
    [dispatch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    dispatch(setSearchQuery(value));
    
    if (value.trim()) {
      debouncedSearch(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch(searchContent(localQuery));
      router.push('/search');
    }
  };

  const handleFocus = () => {
    if (localQuery.trim()) {
      router.push('/search');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder="Search news, movies, posts..."
          className="w-full px-4 py-2 pl-10 pr-10 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:placeholder-gray-400"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
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
        </div>
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </form>
  );
}
