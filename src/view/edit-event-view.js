import flatpickr from 'flatpickr';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFormattingDate } from '../utils/event.js';
import 'flatpickr/dist/flatpickr.min.css';
import { DateFormat } from '../const.js';

const createEditEventTemplate = ({event, offers, eventTypes, destinations}) => {
  const eventTypeItems = eventTypes.map((type) => (
    `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${event.type === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
  </div>`
  )).join('');

  const offersByType = offers.find((element) => element.type === event.type).offers;
  const destination = destinations.find((element) => element.id === event.destination);
  const destinationList = destinations.map((element) => `<option value="${element.name}"></option>`).join('');
  const destinationPhotos = destination.pictures.map((element) => `<img class="event__photo" src="${element.src}" alt="Event photo">`).join('');
  const startDate = getFormattingDate(event.dateFrom, DateFormat.FORM_DATE);
  const endDate = getFormattingDate(event.dateTo, DateFormat.FORM_DATE);
  const offerSection = offersByType.map((element) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${element.id}" type="checkbox" name="event-offer-luggage" ${event.offers.includes(element.id) ? 'checked' : ''}>
    <label class="event__offer-label" for="${element.id}">
      <span class="event__offer-title">${element.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${element.price}</span>
    </label>
  </div>`).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offerSection}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${destinationPhotos}
                </div>
              </div>
          </section>
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
  #datepicker = null;
  constructor({event, offers, eventTypes, destinations, onFormSubmit, onFormClose}){
    super();
    this._setState(EditEventView.parseEventToState(event));
    this.#offers = offers;
    this.#eventTypes = eventTypes;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;

    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  get template() {
    return createEditEventTemplate({
      event: this._state,
      eventTypes: this.#eventTypes,
      destinations: this.#destinations,
      offers: this.#offers
    });
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
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
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
    const destiantion = this.#destinations.find((element) => element.name === evt.target.value);
    this.updateElement({
      destination: destiantion.id
    });
  };

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setStartDatepicker() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        defaultDate: this._state.dateFrom,
        dateFormat: DateFormat.DATEPICKER,
        onChange: this.#startDateChangeHandler,
        enableTime: true,
        time24hr: true,
      }
    );
  }

  #setEndDatepicker() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        defaultDate: this._state.dateTo,
        dateFormat: DateFormat.DATEPICKER,
        onChange: this.#endDateChangeHandler,
        enableTime: true,
        time24hr: true,
      }
    );
  }

  static parseEventToState(event) {
    return {...event};
  }

  static parseStateToEvent(state) {
    const event = {...state};

    return event;
  }
}
