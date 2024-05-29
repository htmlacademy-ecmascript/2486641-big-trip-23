import { SortItems, SortType, UpdateType, UserAction } from '../const.js';
import { render } from '../framework/render.js';
import { SortRules } from '../utils/event.js';
import AddEventView from '../view/add-event-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPresenter from './event-presenter.js';

export default class EventListPresenter {
  #eventListComponent = new EventListView();
  #sortComponent = null;
  #emptyListComponent = new EmptyListView();
  #container = null;
  #eventsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({container, eventsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#destinationModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    return this.#eventsModel.events;
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  #handleViewAction = (actionType, updateType, update) => {
    //console.log(actionType, updateType, update);
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
    //console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList();
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
    this.#sortComponent = new SortView({sortItems: SortItems, onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#container);
  }

  #renderEmptyList(){
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
    this.#renderEventContainer();
    this.#renderEventList();
  }

  #handleModeChange = () => this.#eventPresenters.forEach((presenter) => presenter.resetView());

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEventList();
  };

  #sortEvents(sortType) {
    this.events.sort(SortRules[sortType]);
    this.#currentSortType = sortType;
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  init() {
    this.#sortEvents(this.#currentSortType);
    if (!this.events.length) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    this.#renderTrip();
  }
}
