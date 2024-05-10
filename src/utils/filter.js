import {FilterType} from '../const.js';

const filter = {
  [FilterType.everything]: (events) => events,
  [FilterType.future]: (events) => events.filter((event) => new Date(event.dateFrom) > new Date()),
  [FilterType.present]: (events) => events.filter((event) => (new Date(event.dateFrom) <= new Date() && new Date(event.dateTo) >= new Date())),
  [FilterType.past]: (events) => events.filter((event) => new Date(event.dateTo) < new Date()),
};

export {filter};
