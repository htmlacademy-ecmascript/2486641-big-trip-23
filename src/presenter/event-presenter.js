import { EVENT_TYPES } from '../const';
import { remove, render, replace } from '../framework/render';
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

    const prevEventElement = this.#eventElement;
    const prevEditEventElement = this.#editEventElement;

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

    if (prevEventElement === null || prevEditEventElement === null) {
      render(this.#eventElement, this.#eventListElement);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#eventListElement.contains(prevEventElement.element)) {
      replace(this.#eventElement, prevEventElement);
    }

    if (this.#eventListElement.contains(prevEditEventElement.element)) {
      replace(this.#editEventElement, prevEditEventElement);
    }

    remove(prevEventElement);
    remove(prevEditEventElement);
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

  destroy() {
    remove(this.#eventElement);
    remove(this.#editEventElement);
  }

}
