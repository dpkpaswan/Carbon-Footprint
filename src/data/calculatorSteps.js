/**
 * Step configuration for each category in the calculator.
 * Defines the form fields, labels, units, and validation ranges.
 *
 * @typedef {Object} StepField
 * @property {string} key - Field identifier matching input state keys
 * @property {string} label - Human-readable label for the input
 * @property {string} unit - Unit description shown next to input
 * @property {number} max - Maximum allowed value
 * @property {number} [step] - Input step increment (default: 1)
 */

/**
 * @typedef {Object} Step
 * @property {string} key - Category key (transport, food, energy, shopping)
 * @property {string} title - Step title
 * @property {string} icon - Emoji icon
 * @property {string} description - Step description
 * @property {StepField[]} fields - Array of input fields
 */

/** @type {Step[]} */
export const CALCULATOR_STEPS = [
  {
    key: 'transport',
    title: 'Transportation',
    icon: '🚗',
    description: 'How do you get around?',
    fields: [
      { key: 'carKmPerWeek', label: 'Kilometers driven by car per week', unit: 'km/week', max: 5000 },
      { key: 'flightKmPerMonth', label: 'Kilometers flown per month', unit: 'km/month', max: 50000 },
      { key: 'publicTransportKmPerWeek', label: 'Public transport km per week', unit: 'km/week', max: 2000 },
    ],
  },
  {
    key: 'food',
    title: 'Food & Diet',
    icon: '🍽️',
    description: 'What does your diet look like?',
    fields: [
      { key: 'beefKgPerWeek', label: 'Beef consumed per week', unit: 'kg/week', max: 20, step: 0.1 },
      { key: 'chickenKgPerWeek', label: 'Chicken consumed per week', unit: 'kg/week', max: 20, step: 0.1 },
      { key: 'vegetarianMealsPerWeek', label: 'Vegetarian meals per week', unit: 'meals/week', max: 21 },
    ],
  },
  {
    key: 'energy',
    title: 'Home Energy',
    icon: '⚡',
    description: 'How much energy does your home use?',
    fields: [
      { key: 'electricityKwhPerMonth', label: 'Monthly electricity consumption', unit: 'kWh/month', max: 10000 },
      { key: 'naturalGasCubicMPerMonth', label: 'Monthly natural gas usage', unit: 'm³/month', max: 5000 },
    ],
  },
  {
    key: 'shopping',
    title: 'Shopping & Consumption',
    icon: '🛒',
    description: 'How much do you spend on goods?',
    fields: [
      { key: 'lowImpactSpendPerMonth', label: 'Low-impact spending (books, services)', unit: '₹ thousands/month', max: 500 },
      { key: 'highImpactSpendPerMonth', label: 'High-impact spending (electronics, fashion)', unit: '₹ thousands/month', max: 500 },
    ],
  },
];
