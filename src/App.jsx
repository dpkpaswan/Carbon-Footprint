import React, { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import TabNav from './components/TabNav';
import Calculator from './components/Calculator';
import { useFootprint } from './hooks/useFootprint';
import { useStreak } from './hooks/useStreak';

// Lazy-load non-critical tabs
const Dashboard = lazy(() => import('./components/Dashboard'));
const Actions = lazy(() => import('./components/Actions'));
const Tracker = lazy(() => import('./components/Tracker'));

const TABS = ['Dashboard', 'Calculator', 'Actions', 'Tracker'];

/**
 * Loading spinner shown while lazy components are loading.
 */
function LoadingFallback() {
  return (
    <div className="loading-fallback" role="status" aria-label="Loading">
      <div className="loading-spinner" />
      <p>Loading...</p>
    </div>
  );
}

/**
 * Empty state shown when user hasn't calculated their footprint yet.
 */
function EmptyState({ onStartAssessment }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">🌱</div>
      <h2 className="empty-state-title">Welcome to CarbonLens</h2>
      <p className="empty-state-desc">
        Discover your carbon footprint and learn how to reduce it. 
        Start with a quick assessment — it takes less than 2 minutes.
      </p>
      <button
        className="btn btn-primary btn-lg"
        onClick={onStartAssessment}
      >
        Start Your Assessment →
      </button>
    </div>
  );
}

function App() {
  const footprint = useFootprint();
  const streak = useStreak();
  const [activeTab, setActiveTab] = useState(() => {
    return footprint.hasCalculated ? 'Dashboard' : 'Calculator';
  });

  const handleStartAssessment = () => {
    setActiveTab('Calculator');
  };

  const handleCalculationComplete = () => {
    footprint.completeCalculation();
    setActiveTab('Dashboard');
  };

  const handleReset = () => {
    footprint.resetAll();
    setActiveTab('Calculator');
  };

  /**
   * Renders the active tab panel content.
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        if (!footprint.hasCalculated) {
          return <EmptyState onStartAssessment={handleStartAssessment} />;
        }
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard
              emissions={footprint.emissions}
              annualTonnes={footprint.annualTonnes}
              projectedAnnualTonnes={footprint.projectedAnnualTonnes}
              co2SavedFromActions={footprint.co2SavedFromActions}
              mockHistory={footprint.mockHistory}
            />
          </Suspense>
        );

      case 'Calculator':
        return (
          <Calculator
            inputs={footprint.inputs}
            updateInput={footprint.updateInput}
            onComplete={handleCalculationComplete}
          />
        );

      case 'Actions':
        if (!footprint.hasCalculated) {
          return <EmptyState onStartAssessment={handleStartAssessment} />;
        }
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Actions
              emissions={footprint.emissions}
              toggleCommitAction={footprint.toggleCommitAction}
              isActionCommitted={footprint.isActionCommitted}
              co2SavedFromActions={footprint.co2SavedFromActions}
            />
          </Suspense>
        );

      case 'Tracker':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Tracker
              last7Days={streak.last7Days}
              streakCount={streak.streakCount}
              hasCheckedInToday={streak.hasCheckedInToday}
              logCheckIn={streak.logCheckIn}
            />
          </Suspense>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header onReset={handleReset} hasData={footprint.hasCalculated} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="app-main">
        {renderTabContent()}
      </main>
      <footer className="app-footer">
        <p>CarbonLens © 2025 — Built for a greener future 🌍</p>
      </footer>
    </div>
  );
}

export default App;
