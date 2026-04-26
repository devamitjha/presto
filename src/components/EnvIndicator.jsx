import React from 'react';
import { useLocation } from 'react-router';
import { config, apiFlow } from '../config/env';
import './EnvIndicator.scss';

/**
 * Shows current API flow (Production / UAT) and apiBaseUrl when ?showEnv=1 is in the URL.
 * Use this to verify which REACT_APP_API_BASE_URL the build is using.
 * Example: https://www.presstoindia.com/?showEnv=1
 */
const EnvIndicator = () => {
  const { search } = useLocation();
  const show = new URLSearchParams(search).get('showEnv') === '1';

  if (!show) return null;

  return (
    <div className="env-indicator" role="status" aria-label="Environment indicator">
      <span className="env-indicator__flow">{apiFlow}</span>
      <span className="env-indicator__url" title={config.apiBaseUrl}>
        {config.apiBaseUrl}
      </span>
    </div>
  );
};

export default EnvIndicator;
