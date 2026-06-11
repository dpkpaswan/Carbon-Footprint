import React, { useState } from 'react';
import { QUICK_ACTIONS } from '../data/quickActions';

/**
 * Streak and progress tracker with daily check-in and contribution grid.
 *
 * @param {Object} props
 * @param {Array} props.last7Days - Last 7 days of check-in data
 * @param {number} props.streakCount - Current streak count
 * @param {boolean} props.hasCheckedInToday - Whether user checked in today
 * @param {Function} props.logCheckIn - Callback to log a check-in
 */
function Tracker({ last7Days, streakCount, hasCheckedInToday, logCheckIn }) {
  const [customAction, setCustomAction] = useState('');

  /**
   * Logs a predefined quick action as today's check-in.
   *
   * @param {string} actionLabel - Label of the quick action
   */
  const handleQuickAction = (actionLabel) => {
    logCheckIn(actionLabel);
  };

  /**
   * Handles the custom action form submission.
   *
   * @param {Event} e - Form submit event
   */
  const handleCustomAction = (e) => {
    e.preventDefault();
    if (customAction.trim()) {
      logCheckIn(customAction.trim());
      setCustomAction('');
    }
  };

  return (
    <section
      className="tracker"
      role="tabpanel"
      id="panel-tracker"
      aria-labelledby="tab-tracker"
    >
      {/* Streak Display */}
      <div className="tracker-streak-card">
        <div className="tracker-streak-flame" aria-hidden="true">
          {streakCount > 0 ? '🔥' : '💤'}
        </div>
        <div className="tracker-streak-info">
          <p className="tracker-streak-count" aria-live="polite">
            <span className="tracker-streak-number">{streakCount}</span>
            <span className="tracker-streak-label">day streak</span>
          </p>
          <p className="tracker-streak-msg">
            {streakCount === 0
              ? 'Start your green streak today!'
              : streakCount < 7
              ? 'Keep it going! You&apos;re building a habit.'
              : 'Amazing consistency! You&apos;re a climate champion! 🌍'}
          </p>
        </div>
      </div>

      {/* 7-Day Contribution Grid */}
      <div className="tracker-grid-card">
        <h3 className="tracker-grid-title">Last 7 Days</h3>
        <div className="tracker-grid" role="list" aria-label="Last 7 days of green actions">
          {last7Days.map((day) => (
            <div
              key={day.date}
              className={`tracker-grid-cell ${day.checkedIn ? 'tracker-grid-cell-active' : ''}`}
              role="listitem"
              aria-label={`${day.label}: ${day.checkedIn ? day.action || 'Checked in' : 'No action'}`}
            >
              <span className="tracker-grid-day">{day.label}</span>
              <div className={`tracker-grid-box ${day.checkedIn ? 'tracker-grid-box-filled' : ''}`}>
                {day.checkedIn && <span aria-hidden="true">✓</span>}
              </div>
              {day.checkedIn && day.action && (
                <span className="tracker-grid-action">{day.action}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Check-in */}
      <div className="tracker-checkin-card">
        <h3 className="tracker-checkin-title">
          {hasCheckedInToday ? '✅ You checked in today!' : 'Log a green action today'}
        </h3>

        {!hasCheckedInToday ? (
          <>
            <div className="tracker-quick-actions">
              {QUICK_ACTIONS.map((qa) => (
                <button
                  key={qa.label}
                  className="btn btn-quick-action"
                  onClick={() => handleQuickAction(qa.label)}
                  aria-label={`Log: ${qa.label}`}
                >
                  <span aria-hidden="true">{qa.icon}</span> {qa.label}
                </button>
              ))}
            </div>

            <form className="tracker-custom-form" onSubmit={handleCustomAction}>
              <label htmlFor="custom-action-input" className="sr-only">
                Describe your green action
              </label>
              <input
                type="text"
                id="custom-action-input"
                className="calc-input"
                placeholder="Or describe your own action..."
                value={customAction}
                onChange={(e) => setCustomAction(e.target.value)}
                maxLength={100}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!customAction.trim()}
              >
                Log Action
              </button>
            </form>
          </>
        ) : (
          <div className="tracker-checked-in">
            <p className="tracker-checked-msg">
              Great job! Come back tomorrow to continue your streak. 🌱
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default React.memo(Tracker);
