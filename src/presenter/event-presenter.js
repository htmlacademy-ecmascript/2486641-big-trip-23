import { EVENT_TYPES } from '../const';
import { render, replace } from '../framework/render';
import EditEventView from '../view/edit-event-view';
import EventView from '../view/event-view';

export default class EventPresenter {
  #eventElement = null;
  #editEventElement = null;
  #eventListElement = null;

  #event = null;
  #destination = null;
  #offersInfo = null;
  #cities = null;
  #offers = null;

  constructor({eventListElement}) {
    this.#eventListElement = eventListElement;
  }

  init({event, destination, offersInfo, cities, offers}) {
    this.#event = event;
    this.#destination = destination;
    this.#offersInfo = offersInfo;
    this.#cities = cities;
    this.#offers = offers;

    this.#eventElement = new EventView({
      event: this.#event,
      destination: this.#destination,
      offersInfo: this.#offersInfo,
      onEditClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });
    this.#editEventElement = new EditEventView({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      eventTypes: EVENT_TYPES,
      cities: this.#cities,
      onFormSubmit: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onFormClose: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    render(this.#eventElement, this.#eventListElement);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#editEventElement, this.#eventElement);
  }

  #replaceFormToPoint() {
    replace(this.#eventElement, this.#editEventElement);
  }

}
