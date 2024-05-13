import dayjs from 'dayjs';
import {FilterType} from '../const.js';

const now = dayjs();

const filter = {
  [FilterType.everything]: (events) => events,
  [FilterType.future]: (events) => events.filter((event) => dayjs(event.dateFrom) > now),
  [FilterType.present]: (events) => events.filter((event) => (dayjs(event.dateFrom) <= now && dayjs(event.dateTo) >= now)),
  [FilterType.past]: (events) => events.filter((event) => dayjs(event.dateTo) < now),
};

export {filter};
