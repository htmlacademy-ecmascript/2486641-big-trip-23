import { SortItems, SortType } from '../const.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
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
  #events = [];
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({container, eventsModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
  }

  #renderEventContainer(){
    render(this.#eventListComponent, this.#container);
  }

  #renderEventList(){
    this.#events.forEach((event) => this.#renderEvent(event));
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
      onDataChange: this.#handleEventChange,
      eventsModel: this.#eventsModel,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init({event});
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderTrip() {
    this.#renderSort();
    this.#renderEventContainer();
    this.#renderEventList();
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init({event: updatedEvent});
  };

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
    this.#events.sort(SortRules[sortType]);
    this.#currentSortType = sortType;
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  init() {
    this.#events = this.#eventsModel.events;
    this.#sortEvents(this.#currentSortType);
    if (!this.#events.length) {
      this.#renderEmptyList();
      return;
    }
    this.#renderTrip();
  }
}
