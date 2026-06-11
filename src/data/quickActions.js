/**
 * Quick green action options for daily streak check-in.
 *
 * @typedef {Object} QuickAction
 * @property {string} label - Display label for the action
 * @property {string} icon - Emoji icon
 */

/** @type {QuickAction[]} */
export const QUICK_ACTIONS = [
  { label: 'Used public transport', icon: '🚌' },
  { label: 'Had a meatless meal', icon: '🥗' },
  { label: 'Turned off lights', icon: '💡' },
  { label: 'Walked or cycled', icon: '🚶' },
  { label: 'Reduced waste', icon: '♻️' },
  { label: 'Bought local produce', icon: '🌽' },
];
