'use client';

import { Provider } from 'react-redux';
import { useEffect, useRef } from 'react';
import { store } from './store';
import { loadUserPreferences } from './slices/userSlice';
import { ThemeProvider } from '../contexts/ThemeContext';

// Component to initialize store with localStorage data
function StoreInitializer() {
  const initialized = useRef(false);

  useEffect(() => {
    // Only run once on mount
    if (!initialized.current) {
      initialized.current = true;
      // Load user preferences (including favorites) from localStorage
      store.dispatch(loadUserPreferences());
    }
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StoreInitializer />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
