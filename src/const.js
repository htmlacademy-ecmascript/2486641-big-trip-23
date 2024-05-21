const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  everything: 'everything',
  future: 'future',
  present: 'present',
  past: 'past',
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


export {EVENT_TYPES, SortItems, FilterType, SortType};
