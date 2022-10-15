import { formatDateISO } from '@helpers/format-date';
import { SELECTOR_OPTIONS } from '@store/modules/services/filters';

export const getStartDateFilters = (startDate: string) => ({
  'filters[publishDate][$between][0]': startDate,
});

export const getEndDateFilters = (endDate: string) => ({
  'filters[publishDate][$between][1]': endDate,
});

export const getIsUpcomingFilters = (status?: string) => {
  switch (status) {
    case SELECTOR_OPTIONS.UPCOMING:
      return {
        'filters[publishDate][$gt]': formatDateISO(new Date()),
      };
    case SELECTOR_OPTIONS.PAST:
      return {
        'filters[publishDate][$lte]': formatDateISO(new Date()),
      };
    default:
      return {};
  }
};
