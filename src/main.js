import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';
import EventsModel from './model/events-model.js';
import EventListPresenter from './presenter/event-list-presenter.js';
import FilterView from './view/filter-view.js';

const controlFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const eventListPresenter = new EventListPresenter({
  container: tripEventsElement,
  eventsModel
});
const filters = generateFilter(eventsModel.events);
render(new FilterView(filters), controlFiltersElement);
eventListPresenter.init();
