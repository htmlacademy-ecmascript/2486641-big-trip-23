import { FilterType, SortItems, SortType, UpdateType, UserAction } from '../const.js';
import { remove, render } from '../framework/render.js';
import { SortRules } from '../utils/event.js';
import { filter } from '../utils/filter.js';
import AddEventView from '../view/add-event-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPresenter from './event-presenter.js';

export default class EventListPresenter {
  #eventListComponent = new EventListView();
  #sortComponent = null;
  #emptyListComponent = null;
  #container = null;
  #eventsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;

  constructor({container, eventsModel, destinationsModel, offersModel, filterModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#destinationModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    //this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    events.sort(SortRules[this.#currentSortType]);
    const filteredEvents = filter[this.#filterType](events);
    console.log(filteredEvents);
    return filteredEvents;
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList(true);
        this.#renderTrip();
        break;
    }
  };

  #renderEventContainer(){
    render(this.#eventListComponent, this.#container);
  }

  #renderEventList(){
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderAddEvent(){
    render(new AddEventView(), this.#eventListComponent.element);
  }

  #renderSort(){
    this.#sortComponent = new SortView({
      sortItems: SortItems,
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });
    render(this.#sortComponent, this.#container);
  }

  #renderEmptyList(){
    this.#emptyListComponent = new EmptyListView(this.#filterType);
    render(this.#emptyListComponent, this.#container);
  }

  #renderEvent(event){
    const eventPresenter = new EventPresenter({
      eventListElement: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations: this.destinations,
      offers: this.offers,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderTrip() {
    if (!this.#sortComponent) {
      this.#renderSort();
    }
    if (!this.events.length) {
      this.#renderEmptyList();
      return;
    }
    this.#renderEventContainer();
    this.#renderEventList();
  }

  #handleModeChange = () => this.#eventPresenters.forEach((presenter) => presenter.resetView());

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventList();
    this.#renderEventList();
  };

  #clearEventList(resetSortType = false) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
    if (resetSortType) {
      remove(this.#sortComponent);
      this.#currentSortType = SortType.DAY;
      console.log(this.#currentSortType);
    }
  }

  init() {
    //this.#renderSort();
    this.#renderTrip();
  }
}
