/**
 * Format date to ISO string in format 'yyyy-mm-dd'
 */
export const formatDateISO = (date: Date) => date.toISOString().split('T')[0];

/**
 * Format date from ISO string to format 'Month, year'
 */
export const formatDateLocale = (date: string) =>
  new Date(date).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
