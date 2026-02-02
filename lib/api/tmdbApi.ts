import axios from 'axios';
import { TMDBResponse, Movie, ContentItem, ContentType, MovieGenre } from '@/types/content';
import { TMDB_API_URL, TMDB_ACCESS_TOKEN, TMDB_IMAGE_BASE_URL } from '@/lib/utils/constants';

// Create axios instance with Bearer token authentication
const tmdbAxios = axios.create({
  baseURL: TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Transform TMDB movie to ContentItem
const transformMovie = (movie: Movie): ContentItem => {
  // Get the first genre if available
  const genreId = movie.genre_ids && movie.genre_ids[0];
  const movieGenre = genreId ? (genreId as MovieGenre) : undefined;

  return {
    id: `movie-${movie.id}`,
    type: ContentType.MOVIE,
    title: movie.title,
    description: movie.overview,
    image: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
    source: 'TMDB',
    publishedAt: movie.release_date || new Date().toISOString(),
    movieGenre,
    metadata: {
      rating: movie.vote_average,
    },
  };
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (
  genre: MovieGenre,
  page: number = 1
): Promise<ContentItem[]> => {
  try {
    const response = await tmdbAxios.get<TMDBResponse>('/discover/movie', {
      params: {
        with_genres: genre,
        page,
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results.slice(0, 10).map(transformMovie);
  } catch (error) {
    console.error(`Error fetching movies for genre ${genre}:`, error);
    throw new Error(`Failed to fetch movies for genre ${genre}`);
  }
};

// Fetch movies for multiple genres
export const fetchMoviesByGenres = async (
  genres: MovieGenre[],
  page: number = 1
): Promise<ContentItem[]> => {
  try {
    const promises = genres.map(genre => fetchMoviesByGenre(genre, page));
    const results = await Promise.allSettled(promises);
    
    const successfulResults = results
      .filter((result): result is PromiseFulfilledResult<ContentItem[]> => result.status === 'fulfilled')
      .flatMap(result => result.value);

    return successfulResults;
  } catch (error) {
    console.error('Error fetching movies by genres:', error);
    throw new Error('Failed to fetch movies');
  }
};

// Fetch trending movies
export const fetchTrendingMovies = async (): Promise<ContentItem[]> => {
  try {
    const response = await tmdbAxios.get<TMDBResponse>('/trending/movie/week');
    return response.data.results.slice(0, 10).map(transformMovie);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw new Error('Failed to fetch trending movies');
  }
};

// Fetch popular movies (as recommendations)
export const fetchMovieRecommendations = async (page: number = 1): Promise<ContentItem[]> => {
  try {
    const response = await tmdbAxios.get<TMDBResponse>('/movie/popular', {
      params: { page },
    });
    return response.data.results.slice(0, 10).map(transformMovie);
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    throw new Error('Failed to fetch movie recommendations');
  }
};

// Search movies
export const searchMovies = async (query: string): Promise<ContentItem[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await tmdbAxios.get<TMDBResponse>('/search/movie', {
      params: { query },
    });
    return response.data.results.slice(0, 20).map(transformMovie);
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies');
  }
};

// Fetch now playing movies
export const fetchNowPlayingMovies = async (): Promise<ContentItem[]> => {
  try {
    const response = await tmdbAxios.get<TMDBResponse>('/movie/now_playing');
    return response.data.results.slice(0, 10).map(transformMovie);
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw new Error('Failed to fetch now playing movies');
  }
};
