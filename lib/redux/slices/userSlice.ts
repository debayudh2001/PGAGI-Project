import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserPreferences, NewsCategory, MovieGenre, ContentItem } from '@/types/content';
import { loadPreferences, savePreferences, loadFavorites, saveFavorites } from '@/lib/utils/localStorage';
import { DEFAULT_PREFERENCES } from '@/lib/utils/constants';

const initialState: UserState = {
  preferences: DEFAULT_PREFERENCES,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Load preferences from localStorage
    loadUserPreferences: (state) => {
      const loadedPreferences = loadPreferences();
      state.preferences = loadedPreferences;
    },
    
    // Update news categories
    updateNewsCategories: (state, action: PayloadAction<NewsCategory[]>) => {
      state.preferences.newsCategories = action.payload;
      savePreferences(state.preferences);
    },
    
    // Toggle a single news category
    toggleNewsCategory: (state, action: PayloadAction<NewsCategory>) => {
      const category = action.payload;
      const index = state.preferences.newsCategories.indexOf(category);
      
      if (index > -1) {
        // Remove category
        state.preferences.newsCategories = state.preferences.newsCategories.filter(c => c !== category);
      } else {
        // Add category
        state.preferences.newsCategories.push(category);
      }
      
      savePreferences(state.preferences);
    },

    // Update movie genres
    updateMovieGenres: (state, action: PayloadAction<MovieGenre[]>) => {
      state.preferences.movieGenres = action.payload;
      savePreferences(state.preferences);
    },
    
    // Toggle a single movie genre
    toggleMovieGenre: (state, action: PayloadAction<MovieGenre>) => {
      const genre = action.payload;
      const index = state.preferences.movieGenres.indexOf(genre);
      
      if (index > -1) {
        // Remove genre
        state.preferences.movieGenres = state.preferences.movieGenres.filter(g => g !== genre);
      } else {
        // Add genre
        state.preferences.movieGenres.push(genre);
      }
      
      savePreferences(state.preferences);
    },
    
    // Add to favorites - now accepts full ContentItem
    addFavorite: (state, action: PayloadAction<ContentItem>) => {
      const exists = state.preferences.favorites.find(item => item.id === action.payload.id);
      if (!exists) {
        state.preferences.favorites.push(action.payload);
        saveFavorites(state.preferences.favorites);
        savePreferences(state.preferences);
      }
    },
    
    // Remove from favorites - accepts ID for removal
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.preferences.favorites = state.preferences.favorites.filter(
        item => item.id !== action.payload
      );
      saveFavorites(state.preferences.favorites);
      savePreferences(state.preferences);
    },
    
    // Toggle favorite - now accepts full ContentItem
    toggleFavorite: (state, action: PayloadAction<ContentItem>) => {
      const id = action.payload.id;
      const index = state.preferences.favorites.findIndex(item => item.id === id);
      
      if (index > -1) {
        // Remove from favorites
        state.preferences.favorites = state.preferences.favorites.filter(
          item => item.id !== id
        );
      } else {
        // Add to favorites
        state.preferences.favorites.push(action.payload);
      }
      
      saveFavorites(state.preferences.favorites);
      savePreferences(state.preferences);
    },
    
    // Reset preferences to default
    resetPreferences: (state) => {
      state.preferences = DEFAULT_PREFERENCES;
      savePreferences(DEFAULT_PREFERENCES);
    },
  },
});

export const {
  loadUserPreferences,
  updateNewsCategories,
  toggleNewsCategory,
  updateMovieGenres,
  toggleMovieGenre,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  resetPreferences,
} = userSlice.actions;

export default userSlice.reducer;
