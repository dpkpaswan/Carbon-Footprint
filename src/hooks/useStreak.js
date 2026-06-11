import { useState, useCallback, useMemo } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';

const STREAK_KEY = 'greenStreak';

/**
 * Gets today's date string in YYYY-MM-DD format.
 *
 * @returns {string} Today's date key
 */
function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Gets date key for N days ago.
 *
 * @param {number} daysAgo - Number of days in the past
 * @returns {string} Date key in YYYY-MM-DD format
 */
function getDateKey(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

/**
 * Custom hook for managing streak / daily check-in logic.
 * Stores check-in data keyed by date in localStorage.
 *
 * @returns {Object} Streak state and handlers
 */
export function useStreak() {
  const [checkIns, setCheckIns] = useState(() => {
    return getFromStorage(STREAK_KEY, {});
  });

  /**
   * The last 7 days of check-in data for the contribution grid.
   */
  const last7Days = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const key = getDateKey(i);
      days.push({
        date: key,
        label: new Date(key + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' }),
        checkedIn: !!checkIns[key],
        action: checkIns[key]?.action || null,
      });
    }
    return days;
  }, [checkIns]);

  /**
   * Current streak count: consecutive days checked in going backwards from today.
   */
  const streakCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < 365; i++) {
      const key = getDateKey(i);
      if (checkIns[key]) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }, [checkIns]);

  /**
   * Whether the user has already checked in today.
   */
  const hasCheckedInToday = useMemo(() => {
    return !!checkIns[getTodayKey()];
  }, [checkIns]);

  /**
   * Logs a green action for today.
   *
   * @param {string} action - Description of the green action taken
   */
  const logCheckIn = useCallback((action) => {
    const today = getTodayKey();
    setCheckIns((prev) => {
      const next = {
        ...prev,
        [today]: {
          action: action || 'Green action logged',
          timestamp: Date.now(),
        },
      };
      saveToStorage(STREAK_KEY, next);
      return next;
    });
  }, []);

  return {
    checkIns,
    last7Days,
    streakCount,
    hasCheckedInToday,
    logCheckIn,
  };
}
