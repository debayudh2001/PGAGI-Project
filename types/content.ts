// News Categories (for GNews API)
export enum NewsCategory {
  GENERAL = 'general',
  WORLD = 'world',
  NATION = 'nation',
  BUSINESS = 'business',
  TECHNOLOGY = 'technology',
  ENTERTAINMENT = 'entertainment',
  SPORTS = 'sports',
  SCIENCE = 'science',
  HEALTH = 'health',
}

// Movie Genres (for TMDB API - using TMDB genre IDs)
export enum MovieGenre {
  ACTION = 28,
  ANIMATION = 16,
  DRAMA = 18,
  FANTASY = 14,
  HORROR = 27,
  MYSTERY = 9648,
  SCIENCE_FICTION = 878,
  THRILLER = 53,
}

// Content Types
export enum ContentType {
  NEWS = 'news',
  MOVIE = 'movie',
  SOCIAL = 'social',
}

// News Article from NewsAPI
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Movie from TMDB
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

// Social Media Post (Mock)
export interface SocialPost {
  id: string;
  username: string;
  avatar: string;
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  timestamp: string;
  hashtags: string[];
}

// Unified Content Item
export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  image: string | null;
  url?: string;
  source: string;
  publishedAt: string;
  newsCategory?: NewsCategory;
  movieGenre?: MovieGenre;
  metadata?: {
    author?: string;
    rating?: number;
    likes?: number;
    comments?: number;
    hashtags?: string[];
  };
}

// User Preferences
export interface UserPreferences {
  newsCategories: NewsCategory[];
  movieGenres: MovieGenre[];
  favorites: ContentItem[];  // Changed from favoriteIds: string[]
  feedOrder?: string[];  // Custom order for personalized feed (array of content IDs)
}

// API Response Types
export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Redux State Types
export interface ContentState {
  feed: ContentItem[];
  trending: ContentItem[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

export interface UserState {
  preferences: UserPreferences;
  loading: boolean;
  error: string | null;
}

export interface SearchState {
  query: string;
  results: ContentItem[];
  loading: boolean;
  error: string | null;
}
