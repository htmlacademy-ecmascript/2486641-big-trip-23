const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  everything: 'everything',
  future: 'future',
  present: 'present',
  past: 'past',
};

const SortType = {
  day: 'day',
  event: 'event',
  time: 'time',
  price: 'price',
  offer: 'offer',
};

const SORT_ITEMS = new Map ([
  [SortType.day, {label: 'Day', available: true}],
  [SortType.event, {label: 'Event', available: false}],
  [SortType.time, {label: 'Time', available: true}],
  [SortType.price, {label: 'Price', available: true}],
  [SortType.offer, {label: 'Offers', available: false}],
]);


export {EVENT_TYPES, SORT_ITEMS, FilterType, SortType};
