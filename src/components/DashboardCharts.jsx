import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend, ReferenceLine,
} from 'recharts';
import { GLOBAL_AVERAGE_TONS_PER_YEAR } from '../data/emissionFactors';

/** @type {string[]} Chart color palette for categories. */
const COLORS = ['#4ade80', '#22d3ee', '#f59e0b', '#f472b6'];

/** Shared chart tick style. */
const TICK_STYLE = { fill: '#a1a1aa', fontSize: 11 };
const TICK_STYLE_LG = { fill: '#a1a1aa', fontSize: 12 };
const GRID_STROKE = '#1e3a1e';

/**
 * Custom tooltip component for all Recharts charts.
 *
 * @param {Object} props - Recharts tooltip props
 * @param {boolean} props.active - Whether tooltip is active
 * @param {Array} props.payload - Tooltip payload data
 * @param {string} props.label - Tooltip label
 * @returns {JSX.Element|null}
 */
export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-label">{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value} kg
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Donut chart showing emissions breakdown by category.
 *
 * @param {Object} props
 * @param {Array<{name: string, value: number}>} props.data - Category data
 */
export const DonutChart = React.memo(function DonutChart({ data }) {
  return (
    <div className="dash-chart-card">
      <h3 className="dash-chart-title">Emissions Breakdown</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

/**
 * Bar chart comparing user footprint against global benchmarks.
 *
 * @param {Object} props
 * @param {Array<{name: string, value: number, fill: string}>} props.data - Comparison data
 */
export const ComparisonBarChart = React.memo(function ComparisonBarChart({ data }) {
  return (
    <div className="dash-chart-card">
      <h3 className="dash-chart-title">Annual Comparison (tonnes)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
          <XAxis dataKey="name" tick={TICK_STYLE} />
          <YAxis tick={TICK_STYLE} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

/**
 * Line chart showing monthly emission trends.
 *
 * @param {Object} props
 * @param {Array<{month: string, co2: number}>} props.data - Monthly data
 */
export const TrendLineChart = React.memo(function TrendLineChart({ data }) {
  /** Monthly global average in kg for reference line. */
  const globalMonthlyKg = (GLOBAL_AVERAGE_TONS_PER_YEAR * 1000) / 12;

  return (
    <div className="dash-chart-card dash-chart-wide">
      <h3 className="dash-chart-title">Monthly Trend (kg CO₂)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
          <XAxis dataKey="month" tick={TICK_STYLE_LG} />
          <YAxis tick={TICK_STYLE_LG} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={globalMonthlyKg}
            stroke="#f59e0b"
            strokeDasharray="5 5"
            label={{ value: 'Global Avg', fill: '#f59e0b', fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="co2"
            name="Your CO₂"
            stroke="#4ade80"
            strokeWidth={3}
            dot={{ fill: '#4ade80', r: 5 }}
            activeDot={{ r: 7, fill: '#22c55e' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
