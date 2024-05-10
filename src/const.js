const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  everything: 'everything',
  future: 'future',
  present: 'present',
  past: 'past',
};

const SORT_ITEMS = [
  {value: 'day', label: 'Day'},
  {value: 'event', label: 'Event'},
  {value: 'time', label: 'Time'},
  {value: 'price', label: 'Price'},
  {value: 'offer', label: 'Offers'},
];

export {EVENT_TYPES, SORT_ITEMS, FilterType};
