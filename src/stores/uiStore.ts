/**
 * UI Store - Manages global UI state
 * Handles theme, sidebar, modal, and other UI-related state
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * UI state interface
 */
export interface UIState {
  // Theme
  theme: 'light' | 'dark';

  // Sidebar
  sidebarCollapsed: boolean;
  sidebarOpen: boolean;

  // Modals
  activeModal: string | null;
  modalData: Record<string, unknown> | null;

  // Loading states
  globalLoading: boolean;

  // Notifications
  notification: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null;
}

/**
 * UI actions interface
 */
export interface UIActions {
  // Theme actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Sidebar actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Modal actions
  openModal: (modalName: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;

  // Loading actions
  setGlobalLoading: (loading: boolean) => void;

  // Notification actions
  showNotification: (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info'
  ) => void;
  hideNotification: () => void;

  // Reset
  reset: () => void;
}

/**
 * Initial UI state
 */
const initialState: UIState = {
  theme: 'light',
  sidebarCollapsed: false,
  sidebarOpen: true,
  activeModal: null,
  modalData: null,
  globalLoading: false,
  notification: null,
};

/**
 * UI store type
 */
type UIStore = UIState & UIActions;

/**
 * Create UI store with DevTools and selective persistence
 * Only persists: theme, sidebarCollapsed
 */
export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // Theme actions
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
        toggleTheme: () =>
          set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }), false, 'toggleTheme'),

        // Sidebar actions
        setSidebarCollapsed: (collapsed) =>
          set({ sidebarCollapsed: collapsed }, false, 'setSidebarCollapsed'),
        toggleSidebar: () =>
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }), false, 'toggleSidebar'),
        setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'setSidebarOpen'),

        // Modal actions
        openModal: (modalName, data = null) =>
          set(
            {
              activeModal: modalName,
              modalData: data,
            },
            false,
            'openModal'
          ),
        closeModal: () =>
          set(
            {
              activeModal: null,
              modalData: null,
            },
            false,
            'closeModal'
          ),

        // Loading actions
        setGlobalLoading: (loading) =>
          set({ globalLoading: loading }, false, 'setGlobalLoading'),

        // Notification actions
        showNotification: (message, type) =>
          set(
            {
              notification: {
                show: true,
                message,
                type,
              },
            },
            false,
            'showNotification'
          ),
        hideNotification: () =>
          set(
            {
              notification: null,
            },
            false,
            'hideNotification'
          ),

        // Reset
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
        }),
      }
    ),
    {
      name: 'ui-store-devtools',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
