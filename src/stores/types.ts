/**
 * Base type definitions for Zustand stores
 */

import { StateCreator, StoreMutatorIdentifier } from 'zustand';

/**
 * Logger middleware for development
 */
export interface LoggerConfig {
  enabled: boolean;
  name?: string;
}

/**
 * Base store state interface
 */
export interface BaseStoreState {
  _initialized: boolean;
}

/**
 * Store actions interface
 */
export interface BaseStoreActions {
  reset: () => void;
}

/**
 * Type for store middleware
 */
export type Middleware = [
  StateCreator<unknown, [], []>,
  [[StoreMutatorIdentifier, unknown]?],
  unknown
];

/**
 * Create a typed store with middleware
 */
export function createStoreWithMiddleware<T>(
  stateCreator: StateCreator<T, [], []>,
  middleware: (config: StateCreator<T, [], []>) => T
): T {
  return middleware(stateCreator);
}
