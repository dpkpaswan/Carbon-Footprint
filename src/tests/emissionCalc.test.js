import { describe, it, expect } from 'vitest';
import {
  calculateTransportEmissions, calculateFoodEmissions,
  calculateEnergyEmissions, calculateShoppingEmissions,
  calculateTotalEmissions, monthlyKgToAnnualTonnes, generateMockHistory,
} from '../utils/emissionCalc';

describe('calculateTransportEmissions', () => {
  it('should return 0 for zero inputs', () => {
    const result = calculateTransportEmissions({
      carKmPerWeek: 0, flightKmPerMonth: 0, publicTransportKmPerWeek: 0,
    });
    expect(result).toBe(0);
  });

  it('should correctly calculate car emissions', () => {
    // 100 km/week * 4.33 weeks/month * 0.21 kg/km = ~90.93
    const result = calculateTransportEmissions({
      carKmPerWeek: 100, flightKmPerMonth: 0, publicTransportKmPerWeek: 0,
    });
    expect(result).toBeCloseTo(90.93, 1);
  });

  it('should combine all transport types', () => {
    const result = calculateTransportEmissions({
      carKmPerWeek: 50, flightKmPerMonth: 200, publicTransportKmPerWeek: 30,
    });
    // car: 50*4.33*0.21=45.465, flight: 200*0.255=51, public: 30*4.33*0.089=11.5611
    const expected = 45.465 + 51 + 11.5611;
    expect(result).toBeCloseTo(expected, 1);
  });
});

describe('calculateFoodEmissions', () => {
  it('should return 0 for zero inputs', () => {
    const result = calculateFoodEmissions({
      beefKgPerWeek: 0, chickenKgPerWeek: 0, vegetarianMealsPerWeek: 0,
    });
    expect(result).toBe(0);
  });

  it('should calculate beef emissions correctly', () => {
    // 1 kg/week * 4.33 * 27 = 116.91
    const result = calculateFoodEmissions({
      beefKgPerWeek: 1, chickenKgPerWeek: 0, vegetarianMealsPerWeek: 0,
    });
    expect(result).toBeCloseTo(116.91, 1);
  });

  it('should include vegetarian meal emissions', () => {
    // 7 meals/week * 0.4 kg/meal * 4.33 * 2.0 = 24.248
    const result = calculateFoodEmissions({
      beefKgPerWeek: 0, chickenKgPerWeek: 0, vegetarianMealsPerWeek: 7,
    });
    expect(result).toBeCloseTo(24.248, 1);
  });
});

describe('calculateEnergyEmissions', () => {
  it('should return 0 for zero inputs', () => {
    const result = calculateEnergyEmissions({
      electricityKwhPerMonth: 0, naturalGasCubicMPerMonth: 0,
    });
    expect(result).toBe(0);
  });

  it('should calculate electricity emissions correctly', () => {
    // 200 kWh * 0.82 = 164
    const result = calculateEnergyEmissions({
      electricityKwhPerMonth: 200, naturalGasCubicMPerMonth: 0,
    });
    expect(result).toBeCloseTo(164, 1);
  });
});

describe('calculateShoppingEmissions', () => {
  it('should calculate combined shopping emissions', () => {
    // low: 5*10=50, high: 3*30=90 => 140
    const result = calculateShoppingEmissions({
      lowImpactSpendPerMonth: 5, highImpactSpendPerMonth: 3,
    });
    expect(result).toBe(140);
  });
});

describe('calculateTotalEmissions', () => {
  it('should sum all categories', () => {
    const result = calculateTotalEmissions({
      transport: { carKmPerWeek: 100, flightKmPerMonth: 0, publicTransportKmPerWeek: 0 },
      food: { beefKgPerWeek: 1, chickenKgPerWeek: 0, vegetarianMealsPerWeek: 0 },
      energy: { electricityKwhPerMonth: 200, naturalGasCubicMPerMonth: 0 },
      shopping: { lowImpactSpendPerMonth: 5, highImpactSpendPerMonth: 3 },
    });
    // transport: ~90.93, food: ~116.91, energy: 164, shopping: 140
    expect(result.total).toBeCloseTo(90.93 + 116.91 + 164 + 140, 0);
    expect(result.breakdown).toHaveProperty('transport');
    expect(result.breakdown).toHaveProperty('food');
    expect(result.breakdown).toHaveProperty('energy');
    expect(result.breakdown).toHaveProperty('shopping');
  });

  it('should handle empty inputs gracefully', () => {
    const result = calculateTotalEmissions({});
    expect(result.total).toBe(0);
  });
});

describe('monthlyKgToAnnualTonnes', () => {
  it('should convert 1000 kg/month to 12 tonnes/year', () => {
    expect(monthlyKgToAnnualTonnes(1000)).toBe(12);
  });

  it('should return 0 for 0 input', () => {
    expect(monthlyKgToAnnualTonnes(0)).toBe(0);
  });
});

describe('generateMockHistory', () => {
  it('should return 7 data points', () => {
    const result = generateMockHistory(500);
    expect(result).toHaveLength(7);
  });

  it('should have month and co2 properties', () => {
    const result = generateMockHistory(500);
    result.forEach((point) => {
      expect(point).toHaveProperty('month');
      expect(point).toHaveProperty('co2');
      expect(typeof point.co2).toBe('number');
    });
  });
});
