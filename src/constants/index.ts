export const IS_CLIENT = process.env.BUILD_TARGET === 'client';

export const IS_SERVER = process.env.BUILD_TARGET === 'server';

export const IS_PROD = process.env.NODE_ENV === 'production';

export const IS_SPA = process.env.BUILD_TYPE === 'spa';

/**
 * Enable PWA
 * 0 - disable
 * 1 - enable
 * 2 - enable and run getInitialProps after service worker is installed and ready
 */
export const IS_PWA = Number(process.env.RAZZLE_ENABLE_PWA || 0);

export const API_DOMAIN = process.env.RAZZLE_API_DOMAIN || '';

export const SITE_DOMAIN = process.env.RAZZLE_SITE_DOMAIN || '';

export const APP_NAME = process.env.RAZZLE_APP_NAME;

export const APP_SHORT_NAME = process.env.RAZZLE_APP_SHORT_NAME || '';

export const BACKGROUND_COLOR = process.env.RAZZLE_APP_BACKGROUND_COLOR;

export const MINIMUM_IMG_THUMBNAIL_WIDTH = 250;

export const CURRENT_YEAR = new Date().getFullYear();
