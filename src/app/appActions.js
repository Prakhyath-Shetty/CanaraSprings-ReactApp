/*
 * action types
 */

export const TOGGLE_LOADER = 'TOGGLE_LOADER'

/*
 * action creators
 */

export function Loader(isActive) {
  return { type: TOGGLE_LOADER, isActive:isActive }
}
