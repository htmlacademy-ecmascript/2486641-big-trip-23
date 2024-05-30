import DestinationsModel from './model/destinations-model.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import EventListPresenter from './presenter/event-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

const controlFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();
const eventListPresenter = new EventListPresenter({
  container: tripEventsElement,
  eventsModel,
  destinationsModel,
  offersModel,
  filterModel
});
const filterPresenter = new FilterPresenter({
  filterContainer: controlFiltersElement,
  filterModel,
  eventsModel
});
filterPresenter.init();
eventListPresenter.init();
