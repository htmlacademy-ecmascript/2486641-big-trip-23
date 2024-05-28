import dayjs from 'dayjs';
import {FilterType} from '../const.js';

const now = dayjs();

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs(event.dateFrom) > now),
  [FilterType.PRESENT]: (events) => events.filter((event) => (dayjs(event.dateFrom) <= now && dayjs(event.dateTo) >= now)),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs(event.dateTo) < now),
};

export {filter};
