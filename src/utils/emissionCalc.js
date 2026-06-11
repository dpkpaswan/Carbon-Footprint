import { EMISSION_FACTORS } from '../data/emissionFactors';

/**
 * Calculates monthly CO2 emissions from transport.
 *
 * @param {Object} transport - Transport input values
 * @param {number} transport.carKmPerWeek - Kilometers driven by car per week
 * @param {number} transport.flightKmPerMonth - Kilometers flown per month
 * @param {number} transport.publicTransportKmPerWeek - Kilometers by public transport per week
 * @returns {number} Total transport CO2 in kg/month
 */
export function calculateTransportEmissions({ carKmPerWeek = 0, flightKmPerMonth = 0, publicTransportKmPerWeek = 0 }) {
  const carMonthly = carKmPerWeek * 4.33 * EMISSION_FACTORS.car;
  const flightMonthly = flightKmPerMonth * EMISSION_FACTORS.flight;
  const publicMonthly = publicTransportKmPerWeek * 4.33 * EMISSION_FACTORS.publicTransport;
  return carMonthly + flightMonthly + publicMonthly;
}

/**
 * Calculates monthly CO2 emissions from food consumption.
 *
 * @param {Object} food - Food input values
 * @param {number} food.beefKgPerWeek - Kilograms of beef consumed per week
 * @param {number} food.chickenKgPerWeek - Kilograms of chicken consumed per week
 * @param {number} food.vegetarianMealsPerWeek - Number of vegetarian meals per week (approx 0.4kg per meal)
 * @returns {number} Total food CO2 in kg/month
 */
export function calculateFoodEmissions({ beefKgPerWeek = 0, chickenKgPerWeek = 0, vegetarianMealsPerWeek = 0 }) {
  const beefMonthly = beefKgPerWeek * 4.33 * EMISSION_FACTORS.beef;
  const chickenMonthly = chickenKgPerWeek * 4.33 * EMISSION_FACTORS.chicken;
  const vegMonthly = vegetarianMealsPerWeek * 0.4 * 4.33 * EMISSION_FACTORS.vegetarian;
  return beefMonthly + chickenMonthly + vegMonthly;
}

/**
 * Calculates monthly CO2 emissions from energy usage.
 *
 * @param {Object} energy - Energy input values
 * @param {number} energy.electricityKwhPerMonth - Monthly electricity consumption in kWh
 * @param {number} energy.naturalGasCubicMPerMonth - Monthly natural gas usage in cubic meters
 * @returns {number} Total energy CO2 in kg/month
 */
export function calculateEnergyEmissions({ electricityKwhPerMonth = 0, naturalGasCubicMPerMonth = 0 }) {
  const elecMonthly = electricityKwhPerMonth * EMISSION_FACTORS.electricity;
  const gasMonthly = naturalGasCubicMPerMonth * EMISSION_FACTORS.naturalGas;
  return elecMonthly + gasMonthly;
}

/**
 * Calculates monthly CO2 emissions from shopping/consumption.
 *
 * @param {Object} shopping - Shopping input values
 * @param {number} shopping.lowImpactSpendPerMonth - Monthly spending on low-impact goods (₹ thousands)
 * @param {number} shopping.highImpactSpendPerMonth - Monthly spending on high-impact goods (₹ thousands)
 * @returns {number} Total shopping CO2 in kg/month
 */
export function calculateShoppingEmissions({ lowImpactSpendPerMonth = 0, highImpactSpendPerMonth = 0 }) {
  const lowMonthly = lowImpactSpendPerMonth * EMISSION_FACTORS.shoppingLow;
  const highMonthly = highImpactSpendPerMonth * EMISSION_FACTORS.shoppingHigh;
  return lowMonthly + highMonthly;
}

/**
 * Calculates total monthly CO2 emissions across all categories.
 *
 * @param {Object} inputs - All calculator inputs
 * @param {Object} inputs.transport - Transport inputs
 * @param {Object} inputs.food - Food inputs
 * @param {Object} inputs.energy - Energy inputs
 * @param {Object} inputs.shopping - Shopping inputs
 * @returns {{ total: number, breakdown: { transport: number, food: number, energy: number, shopping: number } }}
 */
export function calculateTotalEmissions({ transport = {}, food = {}, energy = {}, shopping = {} }) {
  const transportCO2 = calculateTransportEmissions(transport);
  const foodCO2 = calculateFoodEmissions(food);
  const energyCO2 = calculateEnergyEmissions(energy);
  const shoppingCO2 = calculateShoppingEmissions(shopping);

  return {
    total: transportCO2 + foodCO2 + energyCO2 + shoppingCO2,
    breakdown: {
      transport: transportCO2,
      food: foodCO2,
      energy: energyCO2,
      shopping: shoppingCO2,
    },
  };
}

/**
 * Converts monthly kg CO2 to annual tonnes.
 *
 * @param {number} monthlyKg - Monthly CO2 in kilograms
 * @returns {number} Annual CO2 in tonnes
 */
export function monthlyKgToAnnualTonnes(monthlyKg) {
  return (monthlyKg * 12) / 1000;
}

/**
 * Generates mock historical data for the last 6 months plus current.
 * Adds random variation (±15%) to the current value for past months.
 *
 * @param {number} currentMonthlyKg - Current monthly CO2 in kg
 * @returns {Array<{ month: string, co2: number }>} Array of monthly data points
 */
export function generateMockHistory(currentMonthlyKg) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const currentMonthIdx = now.getMonth();
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const monthIdx = (currentMonthIdx - i + 12) % 12;
    const variation = i === 0 ? 1 : 0.85 + Math.random() * 0.30;
    result.push({
      month: months[monthIdx],
      co2: Math.round(currentMonthlyKg * variation),
    });
  }

  return result;
}
