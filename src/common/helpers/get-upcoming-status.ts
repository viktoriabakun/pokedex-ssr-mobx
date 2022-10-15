import { formatDateISO } from '@helpers/format-date';

const getIsUpcomingStatus = (publishDate: string) => publishDate > formatDateISO(new Date());

export default getIsUpcomingStatus;
