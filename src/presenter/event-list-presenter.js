import { SORT_ITEMS } from '../const.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import AddEventView from '../view/add-event-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPresenter from './event-presenter.js';

export default class EventListPresenter {
  #eventListComponent = new EventListView();
  #sortComponent = new SortView(SORT_ITEMS);
  #emptyListComponent = new EmptyListView();
  #container = null;
  #eventsModel = null;
  #events = [];
  #eventPresenters = new Map();

  constructor({container, eventsModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
  }

  #renderEventList(){
    render(this.#eventListComponent, this.#container);
  }

  #renderAddEvent(){
    render(new AddEventView(), this.#eventListComponent.element);
  }

  #renderSort(){
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
      resetEventList: this.#resetEventList
    });
    eventPresenter.init({event});
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderTrip() {
    this.#renderSort();
    this.#renderEventList();
    this.#events.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init({event: updatedEvent});
  };

  #resetEventList = () => this.#eventPresenters.forEach((eventPresenter) => eventPresenter.replaceFormToPoint());

  init() {
    this.#events = this.#eventsModel.events;
    if (!this.#events.length) {
      this.#renderEmptyList();
      return;
    }
    this.#renderTrip();
  }
}
