import { UserPreferences, ContentItem } from '@/types/content';
import { STORAGE_KEYS, DEFAULT_PREFERENCES } from './constants';

// Save user preferences to localStorage
export const savePreferences = (preferences: UserPreferences): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error);
    }
  }
};

// Load user preferences from localStorage
export const loadPreferences = (): UserPreferences => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Migration: Convert old 'favoriteIds' to new 'favorites'
        if (parsed.favoriteIds && !parsed.favorites) {
          console.log('Migrating old favoriteIds to new favorites format (data will be cleared)');
          const migrated: UserPreferences = {
            newsCategories: parsed.newsCategories || DEFAULT_PREFERENCES.newsCategories,
            movieGenres: parsed.movieGenres || DEFAULT_PREFERENCES.movieGenres,
            favorites: [],  // Can't recover full data from IDs, start fresh
          };
          // Save the migrated preferences
          savePreferences(migrated);
          return migrated;
        }
        
        // Migration: Convert old 'categories' structure to new 'newsCategories' + 'movieGenres'
        if (parsed.categories && !parsed.newsCategories && !parsed.movieGenres) {
          console.log('Migrating old preference structure to new format');
          const migrated: UserPreferences = {
            newsCategories: DEFAULT_PREFERENCES.newsCategories,
            movieGenres: DEFAULT_PREFERENCES.movieGenres,
            favorites: parsed.favorites || [],
          };
          // Save the migrated preferences
          savePreferences(migrated);
          return migrated;
        }
        
        // Ensure the structure has the required fields
        return {
          newsCategories: parsed.newsCategories || DEFAULT_PREFERENCES.newsCategories,
          movieGenres: parsed.movieGenres || DEFAULT_PREFERENCES.movieGenres,
          favorites: parsed.favorites || [],
        };
      }
    } catch (error) {
      console.error('Error loading preferences from localStorage:', error);
    }
  }
  return DEFAULT_PREFERENCES;
};

// Save favorites to localStorage (for backwards compatibility, now handled in savePreferences)
export const saveFavorites = (favorites: ContentItem[]): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }
};

// Load favorites from localStorage (for backwards compatibility, now handled in loadPreferences)
export const loadFavorites = (): ContentItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }
  return [];
};

// Clear all stored data
export const clearAllStorage = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
      localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};
