import { getMockCities } from '../mock/city.js';
import { getMockOffer } from '../mock/offer.js';
import { createElement } from '../render.js';
import { getDuration, getFormattingDate } from '../utils.js';

const createEventTemplate = (event) => {
  const {basePrice, dateFrom, dateTo, isFavorite, type, destination, offers} = event;
  const favotiteClass = isFavorite ? 'event__favorite-btn--active' : '';
  const printDate = getFormattingDate(dateFrom, 'MMM D');
  const startDate = getFormattingDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const endDate = getFormattingDate(dateTo, 'YYYY-MM-DDTHH:mm');
  const startTime = getFormattingDate(dateFrom, 'HH:mm');
  const endTime = getFormattingDate(dateTo, 'HH:mm');
  const eventDuration = getDuration(dateFrom, dateTo);
  const city = getMockCities(destination);
  const eventTitle = `${type}  ${city.name}`;
  const offersInfo = offers.map((element) => getMockOffer(element));
  console.log(offersInfo);
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startDate}">${printDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTitle}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}">${endTime}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">20</span>
          </li>
        </ul>
        <button class="event__favorite-btn ${favotiteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


export default class EventView {
  constructor({event}) {
    this.event = event;
  }

  getTemplate() {
    return createEventTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
