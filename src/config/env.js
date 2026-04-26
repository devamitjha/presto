/**
 * App config from environment variables.
 * Set these in .env (local), .env.production (production), or .env.development (UAT).
 * Create .env.production for Hostinger build; values are baked in at build time.
 */

const getEnv = (key, fallback = '') => (process.env[key] !== undefined ? process.env[key] : fallback);

const apiBaseUrl = getEnv('REACT_APP_API_BASE_URL', 'http://itpvuatcapi.press2india.com:8084/api/iTPVCentralAPI');

export const config = {
  // iTPV Central API (userServices – login, register, customer details)
  apiBaseUrl,
  apiToken: getEnv('REACT_APP_API_TOKEN', '7Jx7ou6DwTvK79ig3ZiZbW7SCXoJ5B7kB1IAjg8AL14='),

  // Site API base (auth, OTP, reviews – e.g. https://www.presstoindia.com/api)
  siteApiBaseUrl: getEnv('REACT_APP_SITE_API_BASE_URL', 'https://www.presstoindia.com/api'),
};

/** Human-readable flow for testing: "Production" or "UAT" based on apiBaseUrl */
export const apiFlow =
  apiBaseUrl.includes('itpvuatcapi') || apiBaseUrl.toLowerCase().includes('uat')
    ? 'UAT'
    : 'Production';

export default config;
