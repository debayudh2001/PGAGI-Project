import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SearchState, ContentItem } from '@/types/content';
import { searchNews } from '@/lib/api/newsApi';
import { searchMovies } from '@/lib/api/tmdbApi';
import { searchSocialPosts } from '@/lib/api/socialApi';

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
};

// Search across all content sources
export const searchContent = createAsyncThunk(
  'search/searchContent',
  async (query: string, { rejectWithValue }) => {
    if (!query.trim()) {
      return [];
    }

    try {
      // Search all sources in parallel
      const [newsResults, movieResults, socialResults] = await Promise.allSettled([
        searchNews(query),
        searchMovies(query),
        searchSocialPosts(query),
      ]);

      const allResults: ContentItem[] = [];

      if (newsResults.status === 'fulfilled') {
        allResults.push(...newsResults.value);
      }
      if (movieResults.status === 'fulfilled') {
        allResults.push(...movieResults.value);
      }
      if (socialResults.status === 'fulfilled') {
        allResults.push(...socialResults.value);
      }

      return allResults;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to search content');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
