'use client';

import Image from 'next/image';
import { ContentItem, ContentType } from '@/types/content';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { toggleFavorite } from '@/lib/redux/slices/userSlice';

interface ContentCardProps {
  content: ContentItem;
}

export default function ContentCard({ content }: ContentCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state) => state.user.preferences.favorites
  );

  const isFavorite = favorites.some(item => item.id === content.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(content));  // Pass full content object
  };

  const getTypeBadge = () => {
    const badges = {
      [ContentType.NEWS]: 'bg-blue-100 text-blue-800',
      [ContentType.MOVIE]: 'bg-purple-100 text-purple-800',
      [ContentType.SOCIAL]: 'bg-green-100 text-green-800',
    };

    return badges[content.type] || 'bg-gray-100 text-gray-800';
  };

  const getActionButton = () => {
    if (content.type === ContentType.MOVIE) {
      // Extract movie ID from content.id (format: "movie-12345")
      const movieId = content.id.replace('movie-', '');
      const tmdbUrl = `https://www.themoviedb.org/movie/${movieId}`;
      
      return (
        <a
          href={tmdbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm"
        >
          View Details
        </a>
      );
    }
    if (content.type === ContentType.NEWS && content.url) {
      return (
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm"
        >
          Read More
        </a>
      );
    }
    return (
      <button className="btn-secondary text-sm">
        View Post
      </button>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="card overflow-hidden group bg-white dark:bg-gray-800 transition-colors">
      {/* Image */}
      {content.image && (
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <Image
            src={content.image}
            alt={content.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${getTypeBadge()}`}>
            {content.type}
          </span>
          <button
            onClick={handleToggleFavorite}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'
              }`}
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
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {content.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
          {content.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">{content.source}</span>
          <span>{formatDate(content.publishedAt)}</span>
        </div>

        {/* Additional Metadata */}
        {content.metadata && (
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
            {content.metadata.rating && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span>{content.metadata.rating.toFixed(1)}</span>
              </div>
            )}
            {content.metadata.likes && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{content.metadata.likes}</span>
              </div>
            )}
            {content.metadata.comments && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{content.metadata.comments}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center">
          {getActionButton()}
        </div>
      </div>
    </div>
  );
}
