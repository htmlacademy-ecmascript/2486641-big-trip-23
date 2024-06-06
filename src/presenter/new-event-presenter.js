import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType, EventTypes, NewEvent} from '../const.js';
import EditEventView from '../view/edit-event-view.js';

export default class NewEventPresenter {
  #eventListElement = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #destinations = null;
  #offers = null;
  #eventTypes = EventTypes;
  #event = NewEvent;

  #addEventElement = null;

  constructor({eventListElement, destinations, offers, onDataChange, onDestroy}) {
    this.#eventListElement = eventListElement;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    if (this.#addEventElement !== null) {
      return;
    }

    this.#addEventElement = new EditEventView({
      event: this.#event,
      offers: this.#offers,
      eventTypes: this.#eventTypes,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onFormClose: this.#handleDeleteClick,
    });

    render(this.#addEventElement, this.#eventListElement, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (!this.#addEventElement) {
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
      event,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
