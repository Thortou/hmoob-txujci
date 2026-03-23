/**
 * Store creation utility functions for consistent Zustand store setup
 */

import { create, StateCreator, UseBoundStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { DevToolsConfig, PersistConfig } from './middleware';

/**
 * Create a basic Zustand store
 */
export function createBaseStore<T>(
  stateCreator: StateCreator<T, [], []>
): UseBoundStore<T> {
  return create<T>()(stateCreator);
}

/**
 * Create a Zustand store with DevTools middleware
 */
export function createStoreWithDevTools<T>(
  stateCreator: StateCreator<T, [], []>,
  config: DevToolsConfig
): UseBoundStore<T> {
  return create<T>()(
    devtools(stateCreator, {
      name: config.name,
      enabled: config.enabled ?? process.env.NODE_ENV === 'development',
    })
  );
}

/**
 * Create a Zustand store with persist middleware
 */
export function createStoreWithPersist<T>(
  stateCreator: StateCreator<T, [], []>,
  config: PersistConfig
): UseBoundStore<T> {
  return create<T>()(
    persist(stateCreator, {
      name: config.name,
      partialize: config.partialize || ((state) => state),
    })
  );
}

/**
 * Create a Zustand store with both DevTools and persist middleware
 */
export function createStoreWithDevToolsAndPersist<T>(
  stateCreator: StateCreator<T, [], [['zustand/devtools', never], ['zustand/persist', unknown]]>,
  devToolsConfig: DevToolsConfig,
  persistConfig: PersistConfig
): UseBoundStore<T> {
  return create<T>()(
    devtools(
      persist(stateCreator, {
        name: persistConfig.name,
        partialize: persistConfig.partialize || ((state) => state),
      }),
      {
        name: devToolsConfig.name,
        enabled: devToolsConfig.enabled ?? process.env.NODE_ENV === 'development',
      }
    )
  );
}
