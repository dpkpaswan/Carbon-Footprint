import React, { useMemo } from 'react';
import { DonutChart, ComparisonBarChart, TrendLineChart } from './DashboardCharts';
import { GLOBAL_AVERAGE_TONS_PER_YEAR, PARIS_TARGET_TONS_PER_YEAR } from '../data/emissionFactors';

const CATEGORY_LABELS = {
  transport: 'Transport',
  food: 'Food',
  energy: 'Energy',
  shopping: 'Shopping',
};

/**
 * Dashboard component showing carbon footprint visualizations.
 *
 * @param {Object} props
 * @param {Object} props.emissions - Emission breakdown by category
 * @param {number} props.annualTonnes - Annual CO2 in tonnes
 * @param {number} props.projectedAnnualTonnes - Projected annual after committed actions
 * @param {number} props.co2SavedFromActions - Total kg saved from committed actions
 * @param {Array} props.mockHistory - Monthly historical data
 */
function Dashboard({ emissions, annualTonnes, projectedAnnualTonnes, co2SavedFromActions, mockHistory }) {
  const { total, breakdown } = emissions;

  /** @type {number} Percentage difference vs global average. */
  const percentVsAverage = useMemo(() => {
    return ((annualTonnes - GLOBAL_AVERAGE_TONS_PER_YEAR) / GLOBAL_AVERAGE_TONS_PER_YEAR) * 100;
  }, [annualTonnes]);

  /** @type {Array<{name: string, value: number}>} Donut chart data. */
  const donutData = useMemo(() => {
    return Object.entries(breakdown).map(([key, value]) => ({
      name: CATEGORY_LABELS[key],
      value: Math.round(value * 10) / 10,
    }));
  }, [breakdown]);

  /** @type {Array<{name: string, value: number, fill: string}>} Comparison bar chart data. */
  const comparisonData = useMemo(() => [
    { name: 'You (actual)', value: parseFloat(annualTonnes.toFixed(2)), fill: '#4ade80' },
    { name: 'You (projected)', value: parseFloat(projectedAnnualTonnes.toFixed(2)), fill: '#22d3ee' },
    { name: 'Global Avg', value: GLOBAL_AVERAGE_TONS_PER_YEAR, fill: '#f59e0b' },
    { name: 'Paris Target', value: PARIS_TARGET_TONS_PER_YEAR, fill: '#34d399' },
  ], [annualTonnes, projectedAnnualTonnes]);

  /** @type {string} Highest-emitting category label. */
  const highestCategory = useMemo(() => {
    let max = 0;
    let cat = 'transport';
    for (const [key, val] of Object.entries(breakdown)) {
      if (val > max) { max = val; cat = key; }
    }
    return CATEGORY_LABELS[cat];
  }, [breakdown]);

  /** @type {boolean} Whether footprint is below average. */
  const isBelowAverage = percentVsAverage <= 0;

  return (
    <section className="dashboard" role="tabpanel" id="panel-dashboard" aria-labelledby="tab-dashboard">
      <div className="dash-score-card">
        <div className="dash-score-main">
          <p className="dash-score-label">Your Carbon Footprint</p>
          <p className="dash-score-value" aria-live="polite">
            <span className="dash-score-number">{total.toFixed(0)}</span>
            <span className="dash-score-unit">kg CO₂/month</span>
          </p>
          <p className="dash-score-annual">{annualTonnes.toFixed(2)} tonnes/year</p>
        </div>

        {co2SavedFromActions > 0 && (
          <div className="dash-projected">
            <p className="dash-projected-label">Projected (with actions)</p>
            <p className="dash-projected-value">{projectedAnnualTonnes.toFixed(2)} tonnes/year</p>
            <p className="dash-projected-saved">
              🌿 {co2SavedFromActions} kg/month saved from committed actions
            </p>
          </div>
        )}

        <div
          className={`dash-insight ${isBelowAverage ? 'dash-insight-good' : 'dash-insight-warn'}`}
          aria-live="polite"
        >
          {isBelowAverage
            ? `🎉 Your footprint is ${Math.abs(percentVsAverage).toFixed(0)}% below the global average!`
            : `⚠️ Your footprint is ${percentVsAverage.toFixed(0)}% above the global average.`}
          <span className="dash-insight-sub">Biggest contributor: {highestCategory}</span>
        </div>
      </div>

      <div className="dash-charts">
        <DonutChart data={donutData} />
        <ComparisonBarChart data={comparisonData} />
        <TrendLineChart data={mockHistory} />
      </div>
    </section>
  );
}

export default React.memo(Dashboard);
