import { getFormattingDate } from '../utils/event.js';
import { DateFormat } from '../const.js';
import { getArrayElement } from '../utils/common.js';

export const createEditEventTemplate = ({ event, offers, eventTypes, destinations }) => {
  let destination = null;
  let destinationPhotos = null;
  let destinationSection = '';
  const eventTypeItems = eventTypes.map((type) => (
    `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${event.type === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
  </div>`
  )).join('');
  const offersByType = getArrayElement(offers, event.type, 'type').offers;
  if (event.destination) {
    destination = getArrayElement(destinations, event.destination);
    destinationPhotos = destination.pictures.map((element) => `<img class="event__photo" src="${element.src}" alt="Event photo">`).join('');
    destinationSection =
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${(destination) ? destination.description : ''}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${destinationPhotos}
          </div>
        </div>
      </section>`;
  }
  const destinationList = destinations.map((element) => `<option value="${element.name}"></option>`).join('');
  const startDate = getFormattingDate(event.dateFrom, DateFormat.FORM_DATE);
  const endDate = getFormattingDate(event.dateTo, DateFormat.FORM_DATE);
  if (offersByType.length) {
    const offerSection = offersByType.map((element) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${element.id}" type="checkbox" name="event-offer-luggage" ${event.offers.includes(element.id) ? 'checked' : ''}>
    <label class="event__offer-label" for="${element.id}">
      <span class="event__offer-title">${element.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${element.price}</span>
    </label>
  </div>`).join('');
    return (
      `<div class="event__available-offers">
      ${offerSection}
    </div>`);
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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
            value="${(destination) ? destination.name : ''}"
            list="destination-list-1">
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
          </section>
          ${destinationSection}
        </section>
      </form>
    </li>`
  );
};
