import {remove, render, RenderPosition} from '../framework/render.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType, EVENT_TYPES} from '../const.js';
import EditEventView from '../view/edit-event-view.js';

export default class NewEventPresenter {
  #eventListElement = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #destinations = null;
  #offers = null;
  #eventTypes = EVENT_TYPES;
  #event = {};

  #addEventElement = null;

  constructor({eventListElement, destinations, offers, onDataChange, onDestroy}) {
    this.#eventListElement = eventListElement;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#event = {...this.#event, type: 'flight', basePrice: '0', offers: ''};
  }

  init() {
    if (this.#addEventElement !== null) {
      return;
    }

    // this.#addEventElement = new AddEventView({
    //   offers: this.#offers,
    //   eventTypes: this.#eventTypes,
    //   destinations: this.#destinations,
    // });
    this.#addEventElement = new EditEventView({
      event: this.#event,
      offers: this.#offers,
      eventTypes: this.#eventTypes,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
    });

    render(this.#addEventElement, this.#eventListElement, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addEventElement === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addEventElement);
    this.#addEventElement = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
