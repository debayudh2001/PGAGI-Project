import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContentState, ContentItem } from '@/types/content';
import { fetchNewsByCategories, fetchTrendingNews } from '@/lib/api/newsApi';
import { fetchMoviesByGenres, fetchTrendingMovies } from '@/lib/api/tmdbApi';
import { fetchSocialPosts, fetchTrendingSocialPosts } from '@/lib/api/socialApi';
import { RootState } from '../store';

const initialState: ContentState = {
  feed: [],
  trending: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
};

// Fetch personalized feed based on user preferences
export const fetchPersonalizedFeed = createAsyncThunk(
  'content/fetchPersonalizedFeed',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const newsCategories = state.user.preferences.newsCategories;
      const movieGenres = state.user.preferences.movieGenres;
      const page = state.content.currentPage;

      // Fetch from all sources in parallel
      const [newsItems, movieItems, socialItems] = await Promise.allSettled([
        newsCategories.length > 0 ? fetchNewsByCategories(newsCategories, page) : Promise.resolve([]),
        movieGenres.length > 0 ? fetchMoviesByGenres(movieGenres, page) : Promise.resolve([]),
        fetchSocialPosts(8),
      ]);

      // Combine results
      const allItems: ContentItem[] = [];

      if (newsItems.status === 'fulfilled') {
        allItems.push(...newsItems.value);
      }
      if (movieItems.status === 'fulfilled') {
        allItems.push(...movieItems.value);
      }
      if (socialItems.status === 'fulfilled') {
        allItems.push(...socialItems.value);
      }

      // Shuffle for variety
      const shuffled = allItems.sort(() => Math.random() - 0.5);

      return shuffled;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch personalized feed');
    }
  }
);

// Fetch trending content
export const fetchTrendingContent = createAsyncThunk(
  'content/fetchTrendingContent',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch trending from all sources
      const [news, movies, social] = await Promise.allSettled([
        fetchTrendingNews(),
        fetchTrendingMovies(),
        fetchTrendingSocialPosts(),
      ]);

      const trendingItems: ContentItem[] = [];

      if (news.status === 'fulfilled') {
        trendingItems.push(...news.value);
      }
      if (movies.status === 'fulfilled') {
        trendingItems.push(...movies.value);
      }
      if (social.status === 'fulfilled') {
        trendingItems.push(...social.value);
      }

      return trendingItems;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch trending content');
    }
  }
);

// Load more content (pagination)
export const loadMoreContent = createAsyncThunk(
  'content/loadMoreContent',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const newsCategories = state.user.preferences.newsCategories;
      const movieGenres = state.user.preferences.movieGenres;
      const nextPage = state.content.currentPage + 1;

      const [newsItems, movieItems] = await Promise.allSettled([
        newsCategories.length > 0 ? fetchNewsByCategories(newsCategories, nextPage) : Promise.resolve([]),
        movieGenres.length > 0 ? fetchMoviesByGenres(movieGenres, nextPage) : Promise.resolve([]),
      ]);

      const moreItems: ContentItem[] = [];

      if (newsItems.status === 'fulfilled') {
        moreItems.push(...newsItems.value);
      }
      if (movieItems.status === 'fulfilled') {
        moreItems.push(...movieItems.value);
      }

      return {
        items: moreItems,
        page: nextPage,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load more content');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearFeed: (state) => {
      state.feed = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    resetContentState: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch Personalized Feed
    builder
      .addCase(fetchPersonalizedFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalizedFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
        state.currentPage = 1;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchPersonalizedFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Trending Content
    builder
      .addCase(fetchTrendingContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Load More Content
    builder
      .addCase(loadMoreContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreContent.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = [...state.feed, ...action.payload.items];
        state.currentPage = action.payload.page;
        state.hasMore = action.payload.items.length > 0;
      })
      .addCase(loadMoreContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFeed, resetContentState } = contentSlice.actions;
export default contentSlice.reducer;
