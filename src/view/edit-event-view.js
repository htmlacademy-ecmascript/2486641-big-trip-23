import flatpickr from 'flatpickr';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFormattingDate } from '../utils/event.js';
import 'flatpickr/dist/flatpickr.min.css';
import { DateFormat } from '../const.js';
import { getArrayElement } from '../utils/common.js';

const createEditEventTemplate = ({event, offers, eventTypes, destinations}) => {
  const {isDisabled, isDeleting, isSaving} = event;
  let destination = null;
  let destinationPhotos = null;
  let destinationSection = '';
  let offerSection = '';
  const eventTypeItems = Object.values(eventTypes).map((type) => (
    `<div class="event__type-item">
      <input id="event-type-${type}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${event.type === type ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="event__type-label  event__type-label--${type}"
        for="event-type-${type}-1">
        ${type[0].toUpperCase() + type.slice(1)}
      </label>
    </div>`
  )).join('');
  const offersByType = getArrayElement(offers, event.type, 'type').offers;
  if (event.destination){
    destination = getArrayElement(destinations, event.destination);
    destinationPhotos = destination.pictures.map((element) => `<img class="event__photo" src="${element.src}" alt="Event photo">`).join('');
    if ((destination.description) || (destinationPhotos)) {
      destinationSection =
        `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          ${(destination.description) ? `<p class="event__destination-description">${destination.description}</p>` : ''}
          ${(destinationPhotos) ? `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${destinationPhotos}
            </div>
          </div>` : ''}
        </section>`;
    }
  }
  const destinationList = destinations.map((element) => `<option value="${element.name}"></option>`).join('');
  const startDate = getFormattingDate(event.dateFrom, DateFormat.FORM_DATE);
  const endDate = getFormattingDate(event.dateTo, DateFormat.FORM_DATE);
  if (offersByType.length) {
    const offersList = offersByType.map((element) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden"
      id="${element.id}"
      type="checkbox"
      name="event-offer-luggage"
      ${event.offers.includes(element.id) ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
    >
    <label class="event__offer-label" for="${element.id}">
      <span class="event__offer-title">${element.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${element.price}</span>
    </label>
  </div>`).join('');
    offerSection =
    `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersList}
  </div>
  </section>`;
  }

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypeItems}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${event.type}
            </label>
            <input class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${(destination) ? destination.name : ''}"
              list="destination-list-1"
              ${isDisabled ? 'disabled' : ''}
            >
            <datalist id="destination-list-1">
              ${destinationList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${startDate}"
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${endDate}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price"
              id="event-price-1"
              type="number"
              min="0"
              name="event-price"
              value="${event.basePrice}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          ${(event.id)
      ? `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>`
      : '<button class="event__reset-btn" type="reset">Cancel</button>'
    }
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offerSection}
          ${destinationSection}
        </section>
      </form>
    </li>`
  );
};

export default class EditEventView extends AbstractStatefulView {
  #offers = null;
  #eventTypes = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #startDatepicker = null;
  #endDatepicker = null;
  #handleDeleteClick = null;

  constructor({event, offers, eventTypes, destinations, onFormSubmit, onFormClose, onDeleteClick}){
    super();
    this._setState(EditEventView.parseEventToState(event));
    this.#offers = offers;
    this.#eventTypes = eventTypes;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditEventTemplate({
      event: this._state,
      eventTypes: this.#eventTypes,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  reset(event) {
    this.updateElement(EditEventView.parseEventToState(event));
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }
    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formCloseHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').
        addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditEventView.parseStateToEvent(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditEventView.parseStateToEvent(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value
    });
  };

  #destinationChangeHandler = (evt) => {
    const destination = getArrayElement(this.#destinations, evt.target.value, 'name');
    if (destination) {
      this.updateElement({
        destination: destination.id
      });
    }
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const offers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'), (offer) => offer.id);
    this._setState({offers: offers});
  };

  #startDateChangeHandler = ([dateFrom]) => this.updateElement({dateFrom});

  #endDateChangeHandler = ([dateTo]) => this.updateElement({dateTo});

  #setStartDatepicker() {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        defaultDate: this._state.dateFrom,
        dateFormat: DateFormat.DATEPICKER,
        onClose: this.#startDateChangeHandler,
        enableTime: true,
        ['time_24hr']: true,
        maxDate: this._state.dateTo,
      }
    );
  }

  #setEndDatepicker() {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        defaultDate: this._state.dateTo,
        dateFormat: DateFormat.DATEPICKER,
        onClose: this.#endDateChangeHandler,
        enableTime: true,
        ['time_24hr']: true,
        minDate: this._state.dateFrom,
      }
    );
  }

  static parseEventToState(event) {
    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};
    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;
    return event;
  }
}
