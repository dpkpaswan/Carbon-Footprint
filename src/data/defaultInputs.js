/**
 * Default calculator input values for all categories.
 * Used as initial state when no saved data exists.
 *
 * @returns {Object} Default empty inputs keyed by category
 */
export function getDefaultInputs() {
  return {
    transport: {
      carKmPerWeek: 0,
      flightKmPerMonth: 0,
      publicTransportKmPerWeek: 0,
    },
    food: {
      beefKgPerWeek: 0,
      chickenKgPerWeek: 0,
      vegetarianMealsPerWeek: 0,
    },
    energy: {
      electricityKwhPerMonth: 0,
      naturalGasCubicMPerMonth: 0,
    },
    shopping: {
      lowImpactSpendPerMonth: 0,
      highImpactSpendPerMonth: 0,
    },
  };
}
