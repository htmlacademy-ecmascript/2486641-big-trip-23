import EventsApiService from './events-api-service.js';
import { render } from './framework/render.js';
import DestinationsModel from './model/destinations-model.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import EventListPresenter from './presenter/event-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';

const AUTHORIZATION = 'Basic 7950hS1sa2j4049';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const controlFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();
const eventListPresenter = new EventListPresenter({
  container: tripEventsElement,
  eventsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});
const filterPresenter = new FilterPresenter({
  filterContainer: controlFiltersElement,
  filterModel,
  eventsModel
});
const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});
const tripInfoPresenter = new TripInfoPresenter({
  eventsModel,
  offersModel,
  destinationsModel,
  infoContainer: tripMainElement
});
function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  eventListPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

//tripInfoPresenter.init();
//filterPresenter.init();
eventListPresenter.init();
eventsModel.init().finally(() => {
  render(newEventButtonComponent, tripMainElement);
});
