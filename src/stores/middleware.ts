/**
 * Store middleware configuration for Zustand
 * Includes DevTools and persist middleware setup
 */

import { devtools, persist } from 'zustand/middleware';
import { StateCreator, StoreMutatorIdentifier } from 'zustand';

/**
 * DevTools middleware configuration
 */
export interface DevToolsConfig {
  name: string;
  enabled?: boolean;
}

/**
 * Persist middleware configuration
 */
export interface PersistConfig {
  name: string;
  partialize?: (state: unknown) => unknown;
  enabled?: boolean;
}

/**
 * Type for store with DevTools
 */
export type WithDevTools<T> = StateCreator<
  T,
  [['zustand/devtools', never]],
  []
>;

/**
 * Type for store with persist
 */
export type WithPersist<T> = StateCreator<
  T,
  [['zustand/persist', unknown]],
  []
>;

/**
 * Type for store with both DevTools and persist
 */
export type WithDevToolsAndPersist<T> = StateCreator<
  T,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  []
>;

/**
 * Apply DevTools middleware to a store
 */
export function withDevTools<T>(
  config: DevToolsConfig
): (
  stateCreator: StateCreator<T, [], []>
) => WithDevTools<T> {
  return (stateCreator) =>
    devtools(stateCreator, {
      name: config.name,
      enabled: config.enabled ?? process.env.NODE_ENV === 'development',
    });
}

/**
 * Apply persist middleware to a store
 */
export function withPersist<T>(
  config: PersistConfig
): (
  stateCreator: StateCreator<T, [], []>
) => WithPersist<T> {
  return (stateCreator) =>
    persist(stateCreator, {
      name: config.name,
      partialize: config.partialize || ((state) => state),
    });
}

/**
 * Apply both DevTools and persist middleware to a store
 */
export function withDevToolsAndPersist<T>(
  devToolsConfig: DevToolsConfig,
  persistConfig: PersistConfig
): (
  stateCreator: StateCreator<T, [], []>
) => WithDevToolsAndPersist<T> {
  return (stateCreator) => {
    const withDev = withDevTools(devToolsConfig)(stateCreator);
    return withPersist(persistConfig)(withDev as StateCreator<T, [], []>) as WithDevToolsAndPersist<T>;
  };
}
