import EventsApiService from './trip-api-service.js';
import DestinationsModel from './model/destinations-model.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import MainPresenter from './presenter/main-presenter.js';

const AUTHORIZATION = 'Basic 7950hS1sa2j4049';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const controlFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripApiService = new EventsApiService(END_POINT, AUTHORIZATION);
const eventsModel = new EventsModel({
  eventsApiService: tripApiService
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: tripApiService,
});
const offersModel = new OffersModel({
  offersApiService: tripApiService,
});
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  destinationsModel,
  eventsModel,
  offersModel,
  filterModel,
  tripMainContainer: tripMainElement,
  eventListContainer: tripEventsElement,
  filterContainer: controlFiltersElement,
  newEventButtonContainer: tripMainElement,
});

mainPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => eventsModel.init());
});
