import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFootprint } from '../hooks/useFootprint';

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

describe('useFootprint', () => {
  it('should initialize with default empty inputs', () => {
    const { result } = renderHook(() => useFootprint());
    expect(result.current.inputs.transport.carKmPerWeek).toBe(0);
    expect(result.current.inputs.food.beefKgPerWeek).toBe(0);
    expect(result.current.hasCalculated).toBe(false);
  });

  it('should calculate zero emissions with no inputs', () => {
    const { result } = renderHook(() => useFootprint());
    expect(result.current.emissions.total).toBe(0);
    expect(result.current.annualTonnes).toBe(0);
  });

  it('should update inputs and recalculate', () => {
    const { result } = renderHook(() => useFootprint());

    act(() => {
      result.current.updateInput('transport', 'carKmPerWeek', 100);
    });

    expect(result.current.inputs.transport.carKmPerWeek).toBe(100);
    expect(result.current.emissions.total).toBeGreaterThan(0);
    expect(result.current.emissions.breakdown.transport).toBeGreaterThan(0);
  });

  it('should sanitize invalid inputs', () => {
    const { result } = renderHook(() => useFootprint());

    act(() => {
      result.current.updateInput('transport', 'carKmPerWeek', 'not-a-number');
    });

    expect(result.current.inputs.transport.carKmPerWeek).toBe(0);
  });

  it('should mark calculation as complete', () => {
    const { result } = renderHook(() => useFootprint());

    act(() => {
      result.current.completeCalculation();
    });

    expect(result.current.hasCalculated).toBe(true);
  });

  it('should toggle committed actions', () => {
    const { result } = renderHook(() => useFootprint());
    const testAction = { id: 'test-1', co2Saved: 50, title: 'Test Action' };

    act(() => {
      result.current.toggleCommitAction(testAction);
    });

    expect(result.current.isActionCommitted('test-1')).toBe(true);
    expect(result.current.co2SavedFromActions).toBe(50);

    // Toggle off
    act(() => {
      result.current.toggleCommitAction(testAction);
    });

    expect(result.current.isActionCommitted('test-1')).toBe(false);
    expect(result.current.co2SavedFromActions).toBe(0);
  });

  it('should calculate projected footprint with committed actions', () => {
    const { result } = renderHook(() => useFootprint());

    act(() => {
      result.current.updateInput('transport', 'carKmPerWeek', 100);
    });

    const originalTotal = result.current.emissions.total;

    act(() => {
      result.current.toggleCommitAction({ id: 'act-1', co2Saved: 30, title: 'Action 1' });
    });

    expect(result.current.projectedMonthlyKg).toBe(originalTotal - 30);
  });

  it('should reset all data', () => {
    const { result } = renderHook(() => useFootprint());

    act(() => {
      result.current.updateInput('transport', 'carKmPerWeek', 200);
      result.current.completeCalculation();
      result.current.toggleCommitAction({ id: 'a', co2Saved: 10, title: 'A' });
    });

    act(() => {
      result.current.resetAll();
    });

    expect(result.current.inputs.transport.carKmPerWeek).toBe(0);
    expect(result.current.hasCalculated).toBe(false);
    expect(result.current.committedActions).toHaveLength(0);
  });

  it('should generate mock history data', () => {
    const { result } = renderHook(() => useFootprint());

    act(() => {
      result.current.updateInput('energy', 'electricityKwhPerMonth', 300);
    });

    expect(result.current.mockHistory).toHaveLength(7);
    result.current.mockHistory.forEach((point) => {
      expect(point).toHaveProperty('month');
      expect(point).toHaveProperty('co2');
    });
  });
});
