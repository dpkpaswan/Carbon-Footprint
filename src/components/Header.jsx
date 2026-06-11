import React from 'react';

/**
 * Application header with branding and optional reset action.
 *
 * @param {Object} props
 * @param {Function} [props.onReset] - Callback to reset all data
 * @param {boolean} [props.hasData] - Whether user has calculated data
 */
function Header({ onReset, hasData }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-logo" aria-hidden="true">🌍</span>
          <div>
            <h1 className="header-title">CarbonLens</h1>
            <p className="header-subtitle">Know your impact. Take action.</p>
          </div>
        </div>
        {hasData && (
          <button
            className="btn btn-outline btn-sm"
            onClick={onReset}
            aria-label="Reset all data and start over"
          >
            Reset Data
          </button>
        )}
      </div>
    </header>
  );
}

export default React.memo(Header);
