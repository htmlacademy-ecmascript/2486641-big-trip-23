const AUTHORIZATION = 'Basic 7950hS1sa2j4049';

const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const INFO_CITIES_COUNT = 3;

const EventTypes = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

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
  TRIP_INFO: 'D MMM',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  SERVER_ERROR: 'Failed to load latest route information',
};

const NewEvent = {
  type: EventTypes.FLIGHT,
  basePrice: '0',
  offers: [],
  isFavorite: false,
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const Url = {
  EVENTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

const TimeLimit = {
  LOWER_LIMIT: 0,
  UPPER_LIMIT: 1000,
};

export {
  EventTypes,
  SortItems,
  FilterType,
  SortType,
  DateFormat,
  UserAction,
  UpdateType,
  NoTasksTextType,
  NewEvent,
  INFO_CITIES_COUNT,
  Method,
  Url,
  TimeLimit,
  AUTHORIZATION,
  END_POINT
};
