import React, { useMemo } from 'react';
import { ACTION_RECOMMENDATIONS } from '../data/actionRecommendations';

/**
 * Action recommendations page with personalized tips.
 *
 * @param {Object} props
 * @param {Object} props.emissions - Emission breakdown
 * @param {Function} props.toggleCommitAction - Toggle commit on an action
 * @param {Function} props.isActionCommitted - Check if an action is committed
 * @param {number} props.co2SavedFromActions - Total CO2 saved from committed actions
 */
function Actions({ emissions, toggleCommitAction, isActionCommitted, co2SavedFromActions }) {
  const { breakdown } = emissions;

  // Sort categories by emission, highest first, for personalized ordering
  const sortedCategories = useMemo(() => {
    return Object.entries(breakdown)
      .sort(([, a], [, b]) => b - a)
      .map(([key]) => key);
  }, [breakdown]);

  // Group actions by category, sorted by highest emitting category first
  const groupedActions = useMemo(() => {
    const groups = {};
    for (const cat of sortedCategories) {
      groups[cat] = ACTION_RECOMMENDATIONS.filter((a) => a.category === cat);
    }
    return groups;
  }, [sortedCategories]);

  const categoryLabels = {
    transport: { name: 'Transportation', icon: '🚗' },
    food: { name: 'Food & Diet', icon: '🍽️' },
    energy: { name: 'Home Energy', icon: '⚡' },
    shopping: { name: 'Shopping', icon: '🛒' },
  };

  return (
    <section
      className="actions"
      role="tabpanel"
      id="panel-actions"
      aria-labelledby="tab-actions"
    >
      <div className="actions-header">
        <h2 className="actions-title">Personalized Recommendations</h2>
        <p className="actions-subtitle">
          Actions are sorted by your highest-emitting categories. Commit to actions to reduce your projected footprint.
        </p>
        {co2SavedFromActions > 0 && (
          <div className="actions-saved-banner" aria-live="polite">
            🌿 You&apos;ve committed to save <strong>{co2SavedFromActions} kg CO₂/month</strong>
          </div>
        )}
      </div>

      <div className="actions-groups">
        {sortedCategories.map((cat, catIdx) => (
          <div key={cat} className="actions-group">
            <div className="actions-group-header">
              <span className="actions-group-icon" aria-hidden="true">
                {categoryLabels[cat]?.icon}
              </span>
              <h3 className="actions-group-title">
                {categoryLabels[cat]?.name}
                {catIdx === 0 && (
                  <span className="actions-badge-top">Highest Impact</span>
                )}
              </h3>
              <span className="actions-group-emission">
                {breakdown[cat]?.toFixed(0)} kg/mo
              </span>
            </div>

            <div className="actions-list">
              {groupedActions[cat]?.map((action) => {
                const committed = isActionCommitted(action.id);
                return (
                  <div
                    key={action.id}
                    className={`action-card ${committed ? 'action-card-committed' : ''}`}
                  >
                    <div className="action-card-main">
                      <span className="action-icon" aria-hidden="true">{action.icon}</span>
                      <div className="action-info">
                        <h4 className="action-title">{action.title}</h4>
                        <p className="action-desc">{action.description}</p>
                        <p className="action-savings">
                          Saves <strong>{action.co2Saved} kg CO₂/month</strong>
                        </p>
                      </div>
                    </div>
                    <button
                      className={`btn ${committed ? 'btn-committed' : 'btn-commit'}`}
                      onClick={() => toggleCommitAction(action)}
                      aria-pressed={committed}
                      aria-label={`${committed ? 'Uncommit from' : 'Commit to'}: ${action.title}`}
                    >
                      {committed ? '✓ Committed' : 'Commit'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Actions);
