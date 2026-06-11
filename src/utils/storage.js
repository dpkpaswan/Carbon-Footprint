/**
 * Safe localStorage wrapper with try/catch on all operations.
 * Prevents crashes from quota exceeded, disabled storage, or corrupt data.
 */

/**
 * Reads and parses a JSON value from localStorage.
 *
 * @param {string} key - Storage key
 * @param {*} [fallback=null] - Value to return if read fails
 * @returns {*} Parsed value or fallback
 */
export function getFromStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[storage] Failed to read key "${key}":`, error);
    return fallback;
  }
}

/**
 * Serializes and saves a value to localStorage.
 *
 * @param {string} key - Storage key
 * @param {*} value - Value to serialize and store
 * @returns {boolean} True if save succeeded, false otherwise
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[storage] Failed to write key "${key}":`, error);
    return false;
  }
}

/**
 * Removes a key from localStorage.
 *
 * @param {string} key - Storage key to remove
 * @returns {boolean} True if removal succeeded
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`[storage] Failed to remove key "${key}":`, error);
    return false;
  }
}
