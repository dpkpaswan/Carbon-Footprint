<div align="center">

# 🌍 CarbonLens

### Carbon Footprint Awareness Platform

*Know your impact. Take action. Track your progress.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-44%20tests-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

**CarbonLens** is a single-page web application that helps users calculate their personal carbon footprint, visualize their environmental impact through interactive charts, receive personalized recommendations to reduce emissions, and build sustainable habits through daily streak tracking.

[Live Demo](#getting-started) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [Testing](#-testing)

</div>

---

## ✨ Features

### 🧮 Carbon Calculator
A guided multi-step form that walks users through four categories of carbon emissions:

| Step | Category | Inputs |
|------|----------|--------|
| 1 | **Transportation** | Car km/week, flight km/month, public transport km/week |
| 2 | **Food & Diet** | Beef consumption, chicken consumption, vegetarian meals/week |
| 3 | **Home Energy** | Monthly electricity (kWh), natural gas (m³) |
| 4 | **Shopping** | Low-impact spending, high-impact spending (₹ thousands) |

- Progress bar and step indicators for intuitive navigation
- 300ms debounced inputs to prevent excessive re-renders
- All inputs sanitized, validated, and clamped to realistic ranges
- Results persisted to `localStorage` automatically

### 📊 Interactive Dashboard
Rich data visualizations powered by **Recharts**:

- **Score Card** — Total CO₂ in kg/month and tonnes/year with gradient styling
- **Dynamic Insight** — "Your footprint is X% above/below the global average" with emoji indicators
- **Donut Chart** — Emission breakdown by category (Transport, Food, Energy, Shopping)
- **Bar Chart** — Side-by-side comparison: You (actual) vs You (projected) vs Global Average (4.7t/yr) vs Paris Target (2.0t/yr)
- **Trend Line** — 7-month historical trend with global average reference line
- **Projected Footprint** — Shows reduced footprint based on committed actions

### 🎯 Personalized Action Recommendations
16 actionable recommendations organized by emission category:

- Actions are **sorted by your highest-emitting category** first (e.g., if Food is your biggest contributor, food-related tips appear at the top)
- Each action shows **estimated CO₂ savings** (e.g., "Switch to public transport → saves 120 kg/month")
- Users can **commit to actions** — committed actions reduce the projected footprint shown on the Dashboard
- Committed state persists across sessions via `localStorage`

### 🔥 Streak & Progress Tracker
Build sustainable habits with gamified daily check-ins:

- **Streak Counter** — Consecutive days of green actions, displayed with fire emoji animation
- **7-Day Contribution Grid** — GitHub-style visual showing check-in history
- **Quick Actions** — One-tap buttons for common green actions (public transport, meatless meal, etc.)
- **Custom Actions** — Free-text input to log any personal green action
- All check-in data stored with date keys in `localStorage`

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | Component-based UI with hooks |
| **Vite 8** | Lightning-fast dev server and build tool |
| **Tailwind CSS 4** | Utility-first styling via Vite plugin |
| **Recharts** | Responsive charts (Pie, Bar, Line) |
| **Vitest** | Unit testing framework |
| **Testing Library** | React component and hook testing |
| **localStorage** | Client-side data persistence |

---

## 📐 Architecture

```
src/
├── components/
│   ├── Calculator.jsx          # Multi-step carbon calculator form
│   ├── Dashboard.jsx           # Score card + chart layout
│   ├── DashboardCharts.jsx     # Donut, Bar, and Line chart components
│   ├── Actions.jsx             # Personalized recommendations list
│   ├── Tracker.jsx             # Streak tracker + daily check-in
│   ├── Header.jsx              # App header with branding
│   └── TabNav.jsx              # Accessible tab navigation
├── hooks/
│   ├── useFootprint.js         # State management + emission calculations
│   └── useStreak.js            # Streak logic + check-in persistence
├── utils/
│   ├── emissionCalc.js         # Pure calculation functions (JSDoc'd)
│   ├── sanitizeInput.js        # Input validation + sanitization
│   └── storage.js              # localStorage wrapper with try/catch
├── data/
│   ├── emissionFactors.js      # CO₂ emission factor constants
│   ├── actionRecommendations.js # 16 personalized action items
│   ├── calculatorSteps.js      # Calculator step/field configuration
│   ├── defaultInputs.js        # Default input values
│   └── quickActions.js         # Quick check-in action options
├── tests/
│   ├── emissionCalc.test.js    # 15 calculation unit tests
│   ├── sanitizeInput.test.js   # 20 input validation edge cases
│   ├── useFootprint.test.js    # 9 hook integration tests
│   └── setup.js                # Vitest setup (jest-dom)
├── App.jsx                     # Root component with tab routing
├── main.jsx                    # Entry point
└── index.css                   # Design system + all styles
```

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Custom hooks** (`useFootprint`, `useStreak`) | Separates state logic from UI — makes components purely presentational |
| **`useMemo` on calculations** | Carbon totals only recompute when inputs actually change |
| **`React.memo` on chart components** | Prevents expensive chart re-renders when parent state changes |
| **`React.lazy` + `Suspense`** | Dashboard, Actions, and Tracker are code-split into separate chunks |
| **300ms debounced inputs** | Prevents calculation spam while user is still typing |
| **Data files separated from components** | Step configs, emission factors, and actions are pure data — no component coupling |
| **`localStorage` wrapper with try/catch** | Gracefully handles quota exceeded, disabled storage, or corrupt data |

---

## 🔒 Security

- ✅ **Input sanitization** — All user inputs pass through `sanitizeNumber()` with range clamping before use
- ✅ **No `dangerouslySetInnerHTML`** — Zero usage anywhere in the codebase
- ✅ **No `eval()`** — No dynamic code execution
- ✅ **Content Security Policy** — CSP meta tag in `index.html` restricts script/style/font sources
- ✅ **Safe localStorage** — Every read/write wrapped in try/catch via `storage.js`
- ✅ **String sanitization** — HTML characters, control characters stripped from text inputs

---

## ♿ Accessibility

- ✅ Every `<input>` has a `<label>` with `htmlFor`
- ✅ Score output uses `aria-live="polite"` for screen reader announcements
- ✅ Tab navigation uses `role="tablist"`, `role="tab"`, `aria-selected`
- ✅ Full keyboard navigation: Arrow keys, Home/End, Enter/Space
- ✅ Visible `:focus-visible` outline on all interactive elements
- ✅ Semantic HTML: `<main>`, `<header>`, `<nav>`, `<section>`, `<footer>`
- ✅ Color is never the sole indicator — emojis and text always accompany color changes
- ✅ WCAG AA color contrast: light green (#4ade80) on dark background (#0f1a0f)

---

## 🧪 Testing

**44 tests** across 3 test suites — all passing.

```bash
npm test
```

```
 ✓ src/tests/sanitizeInput.test.js  (20 tests)
 ✓ src/tests/emissionCalc.test.js   (15 tests)
 ✓ src/tests/useFootprint.test.js   (9 tests)

 Test Files  3 passed (3)
      Tests  44 passed (44)
```

| Test Suite | Tests | What's Covered |
|-----------|-------|----------------|
| `emissionCalc.test.js` | 15 | All 4 category calculations, total emissions, zero inputs, combined inputs, monthly→annual conversion, mock history generation |
| `sanitizeInput.test.js` | 20 | Valid numbers, string parsing, NaN, null, undefined, empty string, negative clamping, max clamping, Infinity, overflow (1e20), HTML stripping, control characters, string truncation, integer rounding |
| `useFootprint.test.js` | 9 | Default state, zero emissions, input update + recalculation, invalid input sanitization, calculation completion, committed action toggle, projected footprint, full reset, mock history |

---

## 🌱 Emission Factors

Realistic emission factors sourced from IPCC, EPA, and DEFRA guidelines:

```javascript
export const EMISSION_FACTORS = {
  car: 0.21,             // kg CO₂ per km
  flight: 0.255,         // kg CO₂ per km
  publicTransport: 0.089, // kg CO₂ per km
  beef: 27,              // kg CO₂ per kg of beef
  chicken: 6.9,          // kg CO₂ per kg of chicken
  vegetarian: 2.0,       // kg CO₂ per kg of vegetarian food
  electricity: 0.82,     // kg CO₂ per kWh (India grid average)
  naturalGas: 2.04,      // kg CO₂ per cubic meter
  shoppingLow: 10,       // kg CO₂ per ₹1000 spent (low-impact)
  shoppingHigh: 30,      // kg CO₂ per ₹1000 spent (high-impact)
};
```

Benchmarks: **Global Average** = 4.7 tonnes/year · **Paris Agreement Target** = 2.0 tonnes/year

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/dpkpaswan/Carbon-Footprint.git
cd Carbon-Footprint

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm test` | Run all 44 tests with Vitest |

---

## 🎨 Design

- **Dark theme** — Background `#0f1a0f` with accent green `#4ade80`
- **Typography** — Inter (body) + JetBrains Mono (data/numbers)
- **Responsive** — Mobile-first, minimum width 320px
- **Animations** — Smooth tab transitions, hover effects, progress bar animations
- **Empty states** — Friendly CTAs instead of blank screens when no data exists

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Built with 💚 for a greener future**

</div>
