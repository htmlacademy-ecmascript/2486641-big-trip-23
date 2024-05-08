import EventsModel from './model/events-model.js';
import EventListPresenter from './presenter/events-presenter.js';
import {render} from './render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';

const controlFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const eventListPresenter = new EventListPresenter({
  container: tripEventsElement,
  eventsModel
});

render(new FilterView(), controlFiltersElement);
render(new SortView(), tripEventsElement);
eventListPresenter.init();