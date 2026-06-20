import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CALCULATOR_STEPS } from '../data/calculatorSteps';

const TOTAL_STEPS = CALCULATOR_STEPS.length;

/**
 * Multi-step carbon calculator form.
 *
 * @param {Object} props
 * @param {Object} props.inputs - Current input values
 * @param {Function} props.updateInput - Callback to update a single input
 * @param {Function} props.onComplete - Callback when calculation is finished
 */
function Calculator({ inputs, updateInput, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const debounceTimers = useRef({});
  const step = CALCULATOR_STEPS[currentStep];

  /** Cleanup debounce timers on unmount. */
  useEffect(() => {
    const timers = debounceTimers.current;
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  /**
   * Handles input change with 300ms debounce.
   *
   * @param {string} category - Input category key
   * @param {string} field - Input field key
   * @param {string} value - Raw input value string
   */
  const handleInputChange = useCallback(
    (category, field, value) => {
      if (debounceTimers.current[field]) {
        clearTimeout(debounceTimers.current[field]);
      }
      debounceTimers.current[field] = setTimeout(() => {
        updateInput(category, field, value);
      }, 300);
    },
    [updateInput]
  );

  /** Advances to next step or completes the calculation. */
  const goNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      onComplete();
    }
  }, [currentStep, onComplete]);

  /** Goes back to the previous step. */
  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  /** @type {string} Progress bar width as CSS percentage. */
  const progressWidth = `${((currentStep + 1) / TOTAL_STEPS) * 100}%`;

  return (
    <section
      className="calculator"
      role="tabpanel"
      id="panel-calculator"
      aria-labelledby="tab-calculator"
    >
      <div className="calc-progress">
        <div className="calc-progress-bar">
          <div className="calc-progress-fill" style={{ width: progressWidth }} />
        </div>
        <span className="calc-progress-text">
          Step {currentStep + 1} of {TOTAL_STEPS}
        </span>
      </div>

      <div className="calc-step-header">
        <span className="calc-step-icon" aria-hidden="true">{step.icon}</span>
        <div>
          <h2 className="calc-step-title">{step.title}</h2>
          <p className="calc-step-desc">{step.description}</p>
        </div>
      </div>

      <div className="calc-dots" aria-hidden="true">
        {CALCULATOR_STEPS.map((s, idx) => (
          <button
            key={s.key}
            className={`calc-dot ${idx === currentStep ? 'calc-dot-active' : ''} ${idx < currentStep ? 'calc-dot-done' : ''}`}
            onClick={() => setCurrentStep(idx)}
            aria-label={`Go to step ${idx + 1}: ${s.title}`}
          >
            {idx < currentStep ? '✓' : idx + 1}
          </button>
        ))}
      </div>

      <div className="calc-fields">
        {step.fields.map((field) => (
          <div key={field.key} className="calc-field">
            <label htmlFor={`input-${field.key}`} className="calc-label">
              {field.label}
            </label>
            <div className="calc-input-wrap">
              <input
                type="number"
                id={`input-${field.key}`}
                className="calc-input"
                defaultValue={inputs[step.key]?.[field.key] || 0}
                min={0}
                max={field.max}
                step={field.step || 1}
                onChange={(e) => handleInputChange(step.key, field.key, e.target.value)}
                aria-describedby={`unit-${field.key}`}
              />
              <span id={`unit-${field.key}`} className="calc-unit">
                {field.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="calc-nav">
        <button
          className="btn btn-outline"
          onClick={goPrev}
          disabled={currentStep === 0}
          aria-label="Go to previous step"
        >
          ← Back
        </button>
        <button
          className="btn btn-primary"
          onClick={goNext}
          aria-label={currentStep === TOTAL_STEPS - 1 ? 'Calculate your footprint' : 'Go to next step'}
        >
          {currentStep === TOTAL_STEPS - 1 ? 'Calculate My Footprint 🌱' : 'Next →'}
        </button>
      </div>
    </section>
  );
}

export default Calculator;
