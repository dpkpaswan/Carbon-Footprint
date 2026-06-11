import { describe, it, expect } from 'vitest';
import { sanitizeNumber, sanitizeString, sanitizeInteger } from '../utils/sanitizeInput';

describe('sanitizeNumber', () => {
  it('should return the number for valid input', () => {
    expect(sanitizeNumber(42)).toBe(42);
  });

  it('should parse string numbers', () => {
    expect(sanitizeNumber('3.14')).toBeCloseTo(3.14);
  });

  it('should return fallback for NaN', () => {
    expect(sanitizeNumber(NaN, 0, 100, 5)).toBe(5);
  });

  it('should return fallback for non-numeric strings', () => {
    expect(sanitizeNumber('hello', 0, 100, 0)).toBe(0);
  });

  it('should return fallback for null', () => {
    expect(sanitizeNumber(null)).toBe(0);
  });

  it('should return fallback for undefined', () => {
    expect(sanitizeNumber(undefined)).toBe(0);
  });

  it('should return fallback for empty string', () => {
    expect(sanitizeNumber('')).toBe(0);
  });

  it('should clamp to min', () => {
    expect(sanitizeNumber(-10, 0, 100)).toBe(0);
  });

  it('should clamp to max', () => {
    expect(sanitizeNumber(999, 0, 100)).toBe(100);
  });

  it('should return fallback for Infinity', () => {
    expect(sanitizeNumber(Infinity, 0, 100, 0)).toBe(0);
  });

  it('should return fallback for negative Infinity', () => {
    expect(sanitizeNumber(-Infinity, 0, 100, 0)).toBe(0);
  });

  it('should handle very large overflow numbers', () => {
    expect(sanitizeNumber(1e20, 0, 100000)).toBe(100000);
  });
});

describe('sanitizeString', () => {
  it('should trim whitespace', () => {
    expect(sanitizeString('  hello  ')).toBe('hello');
  });

  it('should remove HTML-like characters', () => {
    expect(sanitizeString('<script>alert("xss")</script>')).toBe('scriptalert(xss)/script');
  });

  it('should return empty string for non-strings', () => {
    expect(sanitizeString(123)).toBe('');
    expect(sanitizeString(null)).toBe('');
    expect(sanitizeString(undefined)).toBe('');
  });

  it('should truncate long strings', () => {
    const long = 'a'.repeat(600);
    expect(sanitizeString(long, 500).length).toBe(500);
  });

  it('should remove control characters', () => {
    expect(sanitizeString('hello\x00world')).toBe('helloworld');
  });
});

describe('sanitizeInteger', () => {
  it('should round float to nearest integer', () => {
    expect(sanitizeInteger(3.7)).toBe(4);
  });

  it('should clamp and round', () => {
    expect(sanitizeInteger(99.9, 0, 50)).toBe(50);
  });

  it('should return fallback for invalid input', () => {
    expect(sanitizeInteger('abc', 0, 100, 10)).toBe(10);
  });
});
