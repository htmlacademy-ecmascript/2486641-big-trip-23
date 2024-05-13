import { EVENT_TYPES, SORT_ITEMS } from '../const.js';
import { render, replace } from '../framework/render.js';
import AddEventView from '../view/add-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';

export default class EventListPresenter {
  #eventListComponent = new EventListView();
  #container = null;
  #eventsModel = null;

  constructor({container, eventsModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
  }

  #renderEventList(){
    render(this.#eventListComponent, this.#container);
  }

  #renderEvent(event, destination, offersInfo, cities, offers){
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventElement = new EventView({
      event,
      destination,
      offersInfo,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const editEventElement = new EditEventView({
      event,
      destination,
      offers,
      eventTypes: EVENT_TYPES,
      cities,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClose: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editEventElement, eventElement);
    }

    function replaceFormToPoint() {
      replace(eventElement, editEventElement);
    }

    render(eventElement, this.#eventListComponent.element);
  }

  #renderAddEvent(){
    render(new AddEventView(), this.#eventListComponent.element);
  }

  #renderSort(){
    render(new SortView(SORT_ITEMS), this.#container);
  }

  #renderTrip() {
    this.#renderSort();
    this.#renderEventList();
    for (const event of this.events){
      const destination = this.#eventsModel.getDestination(event.destination);
      const offersInfo = event.offers.map((element) => this.#eventsModel.getOffer(event.type, element));
      const offers = this.#eventsModel.getOffers(event.type);
      this.#renderEvent(event, destination, offersInfo, this.cities, offers);
    }
  }

  init() {
    this.events = this.#eventsModel.events;
    if (!this.events.length) {
      render(new EmptyListView(), this.#container);
      return;
    }
    this.destinations = this.#eventsModel.destinations;
    this.cities = this.#eventsModel.cities;
    this.#renderTrip();
  }
}
