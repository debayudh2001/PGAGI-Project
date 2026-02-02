import { NewsCategory, MovieGenre } from '@/types/content';

// Available news categories
export const NEWS_CATEGORIES = [
  { value: NewsCategory.GENERAL, label: 'General' },
  { value: NewsCategory.WORLD, label: 'World' },
  { value: NewsCategory.NATION, label: 'Nation' },
  { value: NewsCategory.BUSINESS, label: 'Business' },
  { value: NewsCategory.TECHNOLOGY, label: 'Technology' },
  { value: NewsCategory.ENTERTAINMENT, label: 'Entertainment' },
  { value: NewsCategory.SPORTS, label: 'Sports' },
  { value: NewsCategory.SCIENCE, label: 'Science' },
  { value: NewsCategory.HEALTH, label: 'Health' },
];

// Available movie genres
export const MOVIE_GENRES = [
  { value: MovieGenre.ACTION, label: 'Action' },
  { value: MovieGenre.ANIMATION, label: 'Animation' },
  { value: MovieGenre.DRAMA, label: 'Drama' },
  { value: MovieGenre.FANTASY, label: 'Fantasy' },
  { value: MovieGenre.HORROR, label: 'Horror' },
  { value: MovieGenre.MYSTERY, label: 'Mystery' },
  { value: MovieGenre.SCIENCE_FICTION, label: 'Science Fiction' },
  { value: MovieGenre.THRILLER, label: 'Thriller' },
];

// Default user preferences
export const DEFAULT_PREFERENCES = {
  newsCategories: [NewsCategory.GENERAL, NewsCategory.TECHNOLOGY],
  movieGenres: [MovieGenre.ACTION, MovieGenre.DRAMA],
  favorites: [],  // Changed from favoriteIds
};

// API Configuration
export const NEWS_API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || 'https://gnews.io/api/v4';
export const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '';

export const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL || 'https://api.themoviedb.org/3';
export const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN || '';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Pagination
export const ITEMS_PER_PAGE = 20;

// Debounce delay for search (ms)
export const SEARCH_DEBOUNCE_DELAY = 500;

// LocalStorage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'dashboard_preferences',
  FAVORITES: 'dashboard_favorites',
};
