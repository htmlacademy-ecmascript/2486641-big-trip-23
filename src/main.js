import { render } from './framework/render.js';
import DestinationsModel from './model/destinations-model.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import EventListPresenter from './presenter/event-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';

const controlFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const eventsModel = new EventsModel();
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
function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  eventListPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, tripMainElement);
filterPresenter.init();
eventListPresenter.init();
