import { useState, useMemo, useCallback, useEffect } from 'react';
import { calculateTotalEmissions, monthlyKgToAnnualTonnes, generateMockHistory } from '../utils/emissionCalc';
import { sanitizeNumber } from '../utils/sanitizeInput';
import { getFromStorage, saveToStorage } from '../utils/storage';
import { getDefaultInputs } from '../data/defaultInputs';

const STORAGE_KEY = 'carbonFootprint';
const COMMITTED_ACTIONS_KEY = 'committedActions';


/**
 * Custom hook for managing carbon footprint state and calculations.
 * Handles input management, emission calculations, committed actions,
 * and localStorage persistence.
 *
 * @returns {Object} Footprint state and handlers
 */
export function useFootprint() {
  const [inputs, setInputs] = useState(() => {
    const saved = getFromStorage(STORAGE_KEY);
    return saved?.inputs || getDefaultInputs();
  });

  const [hasCalculated, setHasCalculated] = useState(() => {
    const saved = getFromStorage(STORAGE_KEY);
    return saved?.hasCalculated || false;
  });

  const [committedActions, setCommittedActions] = useState(() => {
    return getFromStorage(COMMITTED_ACTIONS_KEY, []);
  });

  // Memoized emission calculations — only recalculates when inputs change
  const emissions = useMemo(() => {
    return calculateTotalEmissions(inputs);
  }, [inputs]);

  // Calculate CO2 saved from committed actions
  const co2SavedFromActions = useMemo(() => {
    return committedActions.reduce((sum, action) => sum + (action.co2Saved || 0), 0);
  }, [committedActions]);

  // Projected footprint after committed actions
  const projectedMonthlyKg = useMemo(() => {
    return Math.max(0, emissions.total - co2SavedFromActions);
  }, [emissions.total, co2SavedFromActions]);

  const annualTonnes = useMemo(() => {
    return monthlyKgToAnnualTonnes(emissions.total);
  }, [emissions.total]);

  const projectedAnnualTonnes = useMemo(() => {
    return monthlyKgToAnnualTonnes(projectedMonthlyKg);
  }, [projectedMonthlyKg]);

  const mockHistory = useMemo(() => {
    return generateMockHistory(emissions.total);
  }, [emissions.total]);

  // Persist to localStorage whenever inputs or calculated state change
  useEffect(() => {
    saveToStorage(STORAGE_KEY, { inputs, hasCalculated });
  }, [inputs, hasCalculated]);

  useEffect(() => {
    saveToStorage(COMMITTED_ACTIONS_KEY, committedActions);
  }, [committedActions]);

  /**
   * Updates a single input field within a category.
   * Sanitizes the value before setting.
   *
   * @param {string} category - Category key (transport, food, energy, shopping)
   * @param {string} field - Field key within the category
   * @param {*} value - Raw input value
   */
  const updateInput = useCallback((category, field, value) => {
    const sanitized = sanitizeNumber(value, 0, 100000, 0);
    setInputs((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: sanitized,
      },
    }));
  }, []);

  /**
   * Marks the calculator as complete and saves results.
   */
  const completeCalculation = useCallback(() => {
    setHasCalculated(true);
  }, []);

  /**
   * Toggles an action as committed/uncommitted.
   *
   * @param {Object} action - Action object to toggle
   */
  const toggleCommitAction = useCallback((action) => {
    setCommittedActions((prev) => {
      const exists = prev.find((a) => a.id === action.id);
      if (exists) {
        return prev.filter((a) => a.id !== action.id);
      }
      return [...prev, { id: action.id, co2Saved: action.co2Saved, title: action.title }];
    });
  }, []);

  /**
   * Checks if an action is currently committed.
   *
   * @param {string} actionId - Action ID to check
   * @returns {boolean}
   */
  const isActionCommitted = useCallback(
    (actionId) => {
      return committedActions.some((a) => a.id === actionId);
    },
    [committedActions]
  );

  /**
   * Resets all data to defaults.
   */
  const resetAll = useCallback(() => {
    setInputs(getDefaultInputs());
    setHasCalculated(false);
    setCommittedActions([]);
  }, []);

  return {
    inputs,
    emissions,
    annualTonnes,
    projectedAnnualTonnes,
    projectedMonthlyKg,
    co2SavedFromActions,
    mockHistory,
    hasCalculated,
    committedActions,
    updateInput,
    completeCalculation,
    toggleCommitAction,
    isActionCommitted,
    resetAll,
  };
}
