import EventsApiService from './trip-api-service.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import MainPresenter from './presenter/main-presenter.js';
import { AUTHORIZATION, END_POINT } from './const.js';

const controlFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripApiService = new EventsApiService(END_POINT, AUTHORIZATION);
const eventsModel = new EventsModel({
  tripApiService
});
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  eventsModel,
  filterModel,
  tripMainContainer: tripMainElement,
  eventListContainer: tripEventsElement,
  filterContainer: controlFiltersElement,
  newEventButtonContainer: tripMainElement,
});

mainPresenter.init();

eventsModel.init().finally();
