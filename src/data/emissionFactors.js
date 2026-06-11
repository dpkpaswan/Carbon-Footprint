/**
 * Emission factors used for carbon footprint calculations.
 * Sources: IPCC, EPA, DEFRA guidelines (2023 averages).
 *
 * @constant {Object} EMISSION_FACTORS
 */
export const EMISSION_FACTORS = {
  /** kg CO2 per km driven by car */
  car: 0.21,
  /** kg CO2 per km by flight */
  flight: 0.255,
  /** kg CO2 per km via public transport */
  publicTransport: 0.089,
  /** kg CO2 per kg of beef consumed */
  beef: 27,
  /** kg CO2 per kg of chicken consumed */
  chicken: 6.9,
  /** kg CO2 per kg of vegetarian food */
  vegetarian: 2.0,
  /** kg CO2 per kWh of electricity (India grid average) */
  electricity: 0.82,
  /** kg CO2 per cubic meter of natural gas */
  naturalGas: 2.04,
  /** kg CO2 per ₹1000 spent (low-impact goods) */
  shoppingLow: 10,
  /** kg CO2 per ₹1000 spent (high-impact goods) */
  shoppingHigh: 30,
};

/**
 * Global average carbon footprint (tonnes CO2 per year).
 * @constant {number}
 */
export const GLOBAL_AVERAGE_TONS_PER_YEAR = 4.7;

/**
 * Paris Agreement target (tonnes CO2 per year per person).
 * @constant {number}
 */
export const PARIS_TARGET_TONS_PER_YEAR = 2.0;
