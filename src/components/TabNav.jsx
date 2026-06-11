import React from 'react';

/**
 * Tab navigation component with accessible role attributes.
 *
 * @param {Object} props
 * @param {string[]} props.tabs - Array of tab labels
 * @param {string} props.activeTab - Currently active tab label
 * @param {Function} props.onTabChange - Callback when tab is selected
 */
function TabNav({ tabs, activeTab, onTabChange }) {
  /**
   * Handles keyboard navigation between tabs.
   * Arrow keys move focus and activate tabs.
   */
  const handleKeyDown = (e, index) => {
    let newIndex = index;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    onTabChange(tabs[newIndex]);
    // Focus the new tab button
    const tabList = e.target.closest('[role="tablist"]');
    const buttons = tabList.querySelectorAll('[role="tab"]');
    buttons[newIndex]?.focus();
  };

  const tabIcons = {
    Dashboard: '📊',
    Calculator: '🧮',
    Actions: '🎯',
    Tracker: '🔥',
  };

  return (
    <nav className="tab-nav" aria-label="Main navigation">
      <div className="tab-list" role="tablist" aria-label="Application sections">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              id={`tab-${tab.toLowerCase()}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.toLowerCase()}`}
              tabIndex={isActive ? 0 : -1}
              className={`tab-btn ${isActive ? 'tab-btn-active' : ''}`}
              onClick={() => onTabChange(tab)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <span className="tab-icon" aria-hidden="true">{tabIcons[tab] || '📋'}</span>
              <span className="tab-label">{tab}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default React.memo(TabNav);
