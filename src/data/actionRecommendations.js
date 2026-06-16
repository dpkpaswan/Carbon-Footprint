/**
 * Personalized action recommendations organized by category.
 * Each action includes the estimated CO2 savings per month in kg.
 * @typedef {Object} Action
 * @property {string} id - Unique identifier
 * @property {string} category - Category: transport | food | energy | shopping
 * @property {string} title - Short action title
 * @property {string} description - Detailed description
 * @property {number} co2Saved - Estimated kg CO2 saved per month
 * @property {string} icon - Emoji icon
 */

/** @type {Action[]} */
export const ACTION_RECOMMENDATIONS = [
  // Transport
  {
    id: 'transport-public', category: 'transport', title: 'Switch to public transport',
    description: 'Replace car commutes with bus or metro rides. Public transport produces significantly less CO2 per passenger-km.',
    co2Saved: 120, icon: '🚌',
  },
  {
    id: 'transport-cycle', category: 'transport', title: 'Cycle for short trips',
    description: 'Use a bicycle for trips under 5 km. Zero emissions and great for your health.',
    co2Saved: 65, icon: '🚲',
  },
  {
    id: 'transport-carpool', category: 'transport', title: 'Carpool with colleagues',
    description: 'Share rides to work. Splitting a car between 3 people cuts per-person emissions by ~66%.',
    co2Saved: 85, icon: '🚗',
  },
  {
    id: 'transport-flights', category: 'transport', title: 'Reduce flight travel',
    description: 'Take one fewer flight per year, or choose trains for distances under 500 km.',
    co2Saved: 150, icon: '✈️',
  },
  // Food
  {
    id: 'food-meatless', category: 'food', title: 'Go meatless 3 days/week',
    description: 'Replace beef and chicken with plant-based meals. Livestock farming is a major emissions driver.',
    co2Saved: 90, icon: '🥗',
  },
  {
    id: 'food-local', category: 'food', title: 'Buy local produce',
    description: 'Choose locally grown fruits and vegetables to reduce transport emissions in your food chain.',
    co2Saved: 30, icon: '🌽',
  },
  {
    id: 'food-waste', category: 'food', title: 'Reduce food waste',
    description: 'Plan meals, store food properly, and compost scraps. ~8-10% of global emissions come from food waste.',
    co2Saved: 45, icon: '♻️',
  },
  {
    id: 'food-beef', category: 'food', title: 'Replace beef with chicken',
    description: 'Beef produces nearly 4x more CO2 than chicken per kg. A simple switch makes a big difference.',
    co2Saved: 70, icon: '🍗',
  },
  // Energy
  {
    id: 'energy-led', category: 'energy', title: 'Switch to LED bulbs',
    description: 'LEDs use 75% less energy than incandescent bulbs and last 25x longer.',
    co2Saved: 25, icon: '💡',
  },
  {
    id: 'energy-ac', category: 'energy', title: 'Optimize AC usage',
    description: 'Set AC to 24°C instead of 18°C. Each degree warmer saves ~6% of cooling energy.',
    co2Saved: 55, icon: '❄️',
  },
  {
    id: 'energy-solar', category: 'energy', title: 'Install solar panels',
    description: 'Even a small rooftop solar system can offset 50-80% of household electricity emissions.',
    co2Saved: 200, icon: '☀️',
  },
  {
    id: 'energy-unplug', category: 'energy', title: 'Unplug standby devices',
    description: 'Standby power ("vampire draw") accounts for 5-10% of residential electricity use.',
    co2Saved: 15, icon: '🔌',
  },
  // Shopping
  {
    id: 'shopping-secondhand', category: 'shopping', title: 'Buy secondhand clothing',
    description: 'The fashion industry accounts for ~10% of global emissions. Thrifting extends garment lifecycles.',
    co2Saved: 40, icon: '👕',
  },
  {
    id: 'shopping-repair', category: 'shopping', title: 'Repair instead of replace',
    description: 'Fix electronics and appliances when possible. Manufacturing new items has a large carbon cost.',
    co2Saved: 35, icon: '🔧',
  },
  {
    id: 'shopping-minimal', category: 'shopping', title: 'Practice mindful shopping',
    description: 'Ask "do I need this?" before buying. Reducing consumption is the most effective strategy.',
    co2Saved: 50, icon: '🧘',
  },
  {
    id: 'shopping-digital', category: 'shopping', title: 'Go digital where possible',
    description: 'Use e-books, digital subscriptions, and paperless billing to reduce material consumption.',
    co2Saved: 20, icon: '📱',
  },
];
