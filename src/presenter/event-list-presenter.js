import { SORT_ITEMS } from '../const.js';
import { render } from '../framework/render.js';
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

  #renderTrip() {
    this.#renderSort();
    this.#renderEventList();
    for (const event of this.#events){
      const destination = this.#eventsModel.getDestination(event.destination);
      const offersInfo = event.offers.map((element) => this.#eventsModel.getOffer(event.type, element));
      const offers = this.#eventsModel.getOffers(event.type);
      const eventElement = new EventPresenter({eventListElement: this.#eventListComponent.element});
      eventElement.init({event, destination, offersInfo, cities: this.cities, offers});
    }
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedTask);
    //this.#taskPresenters.get(updatedTask.id).init(updatedTask);
  }

  init() {
    this.#events = this.#eventsModel.events;
    if (!this.#events.length) {
      this.#renderEmptyList();
      return;
    }
    this.destinations = this.#eventsModel.destinations;
    this.cities = this.#eventsModel.cities;
    this.#renderTrip();
  }
}
