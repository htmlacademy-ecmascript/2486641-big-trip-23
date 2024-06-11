import { DateFormat, INFO_CITIES_COUNT } from '../const';
import AbstractView from '../framework/view/abstract-view';
import { getArrayElement } from '../utils/common';
import { getFormattingDate } from '../utils/event';

const getTripDestinations = ({events, destinations}) => {
  const firstCity = getArrayElement(destinations, events[0].destination).name;
  const lastCity = getArrayElement(destinations, events[events.length - 1].destination).name;
  let middleCity = '';
  if (events.length === INFO_CITIES_COUNT) {
    middleCity = `${getArrayElement(destinations, events[1].destination).name} &mdash; `;
  } else if (events.length > INFO_CITIES_COUNT) {
    middleCity = '... &mdash; ';
  }
  return `${firstCity}  &mdash; ${middleCity}${lastCity}`;
};

const getTripDates = ({events}) => (
  `${getFormattingDate(events[0].dateFrom, DateFormat.TRIP_INFO)}
  &nbsp;&mdash;&nbsp;
  ${getFormattingDate(events[events.length - 1].dateTo, DateFormat.TRIP_INFO)}`
);

const getSumOffersPrice = ({events, offers}) => {
  let sumOffersPrice = null;
  events.forEach((item) => {
    sumOffersPrice += item.offers.reduce((sum, offer) => sum + Number(getArrayElement(offers, offer).price), 0);
  });
  return sumOffersPrice;
};

const getSumBasePrice = ({events}) => events.reduce((currentSum, currentNumber) => currentSum + Number(currentNumber.basePrice), 0);

const createTripInfoTemplate = ({events, offers, destinations}) => {
  const sumBasePrice = getSumBasePrice({events});
  const sumOffersPrice = getSumOffersPrice({events, offers});
  const totalSum = sumBasePrice + sumOffersPrice;
  const tripDates = getTripDates({events});
  const tripDestinations = getTripDestinations({events, destinations});
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripDestinations}</h1>

      <p class="trip-info__dates">${tripDates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
    </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #events = null;
  #offers = null;
  #destinations = null;
  constructor({events, offers, destinations}) {
    super();
    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template(){
    return createTripInfoTemplate({
      events: this.#events,
      offers: this.#offers,
      destinations: this.#destinations
    });
  }
}
