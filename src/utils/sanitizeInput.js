/**
 * Sanitizes and validates numeric user input.
 * Parses to float, rejects NaN, clamps to valid range.
 *
 * @param {*} value - Raw input value (string, number, or other)
 * @param {number} [min=0] - Minimum allowed value (inclusive)
 * @param {number} [max=100000] - Maximum allowed value (inclusive)
 * @param {number} [fallback=0] - Value to return if input is invalid
 * @returns {number} Sanitized numeric value clamped to [min, max]
 */
export function sanitizeNumber(value, min = 0, max = 100000, fallback = 0) {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  const parsed = parseFloat(value);

  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, min), max);
}

/**
 * Sanitizes a string input by trimming whitespace and removing
 * potentially dangerous characters. Returns empty string for non-strings.
 *
 * @param {*} value - Raw string input
 * @param {number} [maxLength=500] - Maximum allowed string length
 * @returns {string} Sanitized string
 */
export function sanitizeString(value, maxLength = 500) {
  if (typeof value !== 'string') {
    return '';
  }

  // Trim, remove control characters, and limit length
  return value
    .trim()
    .replace(/[<>'"&\\]/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .slice(0, maxLength);
}

/**
 * Validates that a value is a valid positive integer within range.
 *
 * @param {*} value - Raw input value
 * @param {number} [min=0] - Minimum allowed value
 * @param {number} [max=10000] - Maximum allowed value
 * @param {number} [fallback=0] - Fallback value for invalid input
 * @returns {number} Validated integer
 */
export function sanitizeInteger(value, min = 0, max = 10000, fallback = 0) {
  const sanitized = sanitizeNumber(value, min, max, fallback);
  return Math.round(sanitized);
}
