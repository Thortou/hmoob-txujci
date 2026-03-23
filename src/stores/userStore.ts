/**
 * User Store - Manages user preferences and language state
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * User preferences interface
 */
export interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  notificationsEnabled: boolean;
}

/**
 * User state interface
 */
export interface UserState {
  // User profile (if authenticated)
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;

  // User preferences
  preferences: UserPreferences;

  // User role/permissions
  role: 'admin' | 'user' | 'guest' | null;
}

/**
 * User actions interface
 */
export interface UserActions {
  // Auth actions
  setUserId: (userId: string | null) => void;
  setUserName: (userName: string | null) => void;
  setUserEmail: (userEmail: string | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setRole: (role: 'admin' | 'user' | 'guest' | null) => void;

  // Clear user data
  clearUser: () => void;

  // Preference actions
  setLanguage: (language: string) => void;
  setTimezone: (timezone: string) => void;
  setDateFormat: (dateFormat: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;

  // Reset
  reset: () => void;
}

/**
 * Supported languages
 */
export const SUPPORTED_LANGUAGES = [
  'en',
  'hm',
  'la',
  'ja',
  'ko',
  'zh',
  'th',
  'vi',
] as const;

/**
 * Default user preferences
 */
const defaultPreferences: UserPreferences = {
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateFormat: 'MM/DD/YYYY',
  notificationsEnabled: true,
};

/**
 * Initial user state
 */
const initialState: UserState = {
  userId: null,
  userName: null,
  userEmail: null,
  isAuthenticated: false,
  preferences: defaultPreferences,
  role: null,
};

/**
 * User store type
 */
type UserStore = UserState & UserActions;

/**
 * Create user store with DevTools and selective persistence
 * Only persists: preferences and role (not sensitive auth data)
 */
export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // Auth actions
        setUserId: (userId) => set({ userId }, false, 'setUserId'),
        setUserName: (userName) => set({ userName }, false, 'setUserName'),
        setUserEmail: (userEmail) => set({ userEmail }, false, 'setUserEmail'),
        setAuthenticated: (isAuthenticated) =>
          set({ isAuthenticated }, false, 'setAuthenticated'),
        setRole: (role) => set({ role }, false, 'setRole'),

        // Clear user data
        clearUser: () =>
          set(
            {
              userId: null,
              userName: null,
              userEmail: null,
              isAuthenticated: false,
              role: null,
            },
            false,
            'clearUser'
          ),

        // Preference actions
        setLanguage: (language) =>
          set(
            (state) => ({
              preferences: {
                ...state.preferences,
                language,
              },
            }),
            false,
            'setLanguage'
          ),
        setTimezone: (timezone) =>
          set(
            (state) => ({
              preferences: {
                ...state.preferences,
                timezone,
              },
            }),
            false,
            'setTimezone'
          ),
        setDateFormat: (dateFormat) =>
          set(
            (state) => ({
              preferences: {
                ...state.preferences,
                dateFormat,
              },
            }),
            false,
            'setDateFormat'
          ),
        setNotificationsEnabled: (enabled) =>
          set(
            (state) => ({
              preferences: {
                ...state.preferences,
                notificationsEnabled: enabled,
              },
            }),
            false,
            'setNotificationsEnabled'
          ),
        updatePreferences: (preferences) =>
          set(
            (state) => ({
              preferences: {
                ...state.preferences,
                ...preferences,
              },
            }),
            false,
            'updatePreferences'
          ),

        // Reset
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({
          preferences: state.preferences,
          role: state.role,
        }),
      }
    ),
    {
      name: 'user-store-devtools',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
