import { EVENT_TYPES } from '../const';
import { remove, render, replace } from '../framework/render';
import { getArrayElement } from '../utils/common';
import EditEventView from '../view/edit-event-view';
import EventView from '../view/event-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventElement = null;
  #editEventElement = null;
  #eventListElement = null;
  //#eventsModel = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #event = null;
  #destination = null;
  #offersInfo = null;
  #destinations = null;
  #offers = null;
  #eventTypes = EVENT_TYPES;
  #mode = Mode.DEFAULT;

  constructor({eventListElement, onDataChange, onModeChange, destinations, offers}) {
    this.#eventListElement = eventListElement;
    this.#handleDataChange = onDataChange;
    //this.#eventsModel = eventsModel;
    this.#handleModeChange = onModeChange;
    this.#destinations = destinations;
    this.#offers = offers;
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
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#eventElement, this.#editEventElement);
    this.#mode = Mode.DEFAULT;
  }

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormClose = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormEdit = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#event, isFavorite: !this.#event.isFavorite});
  };

  init({event}) {
    this.#event = event;
    this.#destination = this.#destinations.find((element) => element.id === this.#event.destination);// this.#eventsModel.getDestination(event.destination);
    const offersByType = getArrayElement(this.#offers, this.#event.type, 'type').offers;
    this.#offersInfo = this.#event.offers.map((element) => getArrayElement(offersByType, element));
    //this.#destinations = this.#eventsModel.destinations;
    //this.#offers = this.#eventsModel.getOffers();

    const prevEventElement = this.#eventElement;
    const prevEditEventElement = this.#editEventElement;
    this.#eventElement = new EventView({
      event: this.#event,
      destination: this.#destination,
      offersInfo: this.#offersInfo,
      onEditClick: this.#handleFormEdit,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editEventElement = new EditEventView({
      event: this.#event,
      offers: this.#offers,
      eventTypes: this.#eventTypes,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose
    });

    if (prevEventElement === null || prevEditEventElement === null) {
      render(this.#eventElement, this.#eventListElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventElement, prevEventElement);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventElement, prevEditEventElement);
    }

    remove(prevEventElement);
    remove(prevEditEventElement);
  }

  destroy() {
    remove(this.#eventElement);
    remove(this.#editEventElement);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }
}
