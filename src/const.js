const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const SortItems = {
  [SortType.DAY]: {label: 'Day', available: true},
  [SortType.EVENT]: {label: 'Event', available: false},
  [SortType.TIME]: {label: 'Time', available: true},
  [SortType.PRICE]: {label: 'Price', available: true},
  [SortType.OFFER]: {label: 'Offers', available: false},
};

const DateFormat = {
  POINT_DAY: 'MMM D',
  POINT_TIME: 'HH:mm',
  FULL_DATETIME: 'YYYY-MM-DDTHH:mm',
  FORM_DATE: 'DD/MM/YY HH:mm',
  DATEPICKER: 'd/m/y H:i',
};

export {EVENT_TYPES, SortItems, FilterType, SortType, DateFormat};
