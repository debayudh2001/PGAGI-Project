'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';
import { MOVIE_GENRES } from '@/lib/utils/constants';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { newsCategories, movieGenres, favorites } = useAppSelector(
    (state) => state.user.preferences
  );

  const navItems: NavItem[] = [
    {
      name: 'Feed',
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      name: 'Trending',
      href: '/trending',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      name: 'Favorites',
      href: '/favorites',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 min-h-screen sticky top-16 transition-colors">
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.href)
                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <span
              className={isActive(item.href) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}
            >
              {item.icon}
            </span>
            <span>{item.name}            </span>
            {item.name === 'Favorites' && favorites.length > 0 && (
              <span className="ml-auto bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Active Preferences */}
      <div className="px-4 py-6 border-t dark:border-gray-800">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Active Preferences
        </h3>
        <div className="space-y-3">
          {/* News Categories */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">News</p>
            <div className="flex flex-wrap gap-2">
              {newsCategories.length > 0 ? (
                newsCategories.slice(0, 3).map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 capitalize"
                  >
                    {category}
                  </span>
                ))
              ) : (
                <p className="text-xs text-gray-400">None</p>
              )}
              {newsCategories.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">+{newsCategories.length - 3} more</span>
              )}
            </div>
          </div>

          {/* Movie Genres */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Movies</p>
            <div className="flex flex-wrap gap-2">
              {movieGenres.length > 0 ? (
                movieGenres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                  >
                    {MOVIE_GENRES.find(g => g.value === genre)?.label || genre}
                  </span>
                ))
              ) : (
                <p className="text-xs text-gray-400">None</p>
              )}
              {movieGenres.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">+{movieGenres.length - 3} more</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
