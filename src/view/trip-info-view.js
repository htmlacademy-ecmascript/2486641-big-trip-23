import { DateFormat } from '../const';
import AbstractView from '../framework/view/abstract-view';
import { getArrayElement } from '../utils/common';
import { getFormattingDate } from '../utils/event';

const createTripInfoTemplate = ({events, offers}) => {
  const sumBasePrice = events.reduce((currentSum, currentNumber) => currentSum + Number(currentNumber.basePrice), 0);
  let sumOffersPrice = null;
  events.forEach((item) => {
    sumOffersPrice += item.offers.reduce((sum, offer) => sum + Number(getArrayElement(offers, offer).price), 0);
  });
  const tripDates = `${getFormattingDate(events[0].dateFrom, DateFormat.TRIP_INFO)}&nbsp;&mdash;&nbsp;${getFormattingDate(events[events.length - 1].dateTo, DateFormat.TRIP_INFO)}`;
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">${tripDates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sumBasePrice + sumOffersPrice}</span>
    </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #events = null;
  #offers = null;
  constructor({events, offers}) {
    super();
    this.#events = events;
    this.#offers = offers;
  }

  get template(){
    return createTripInfoTemplate({events: this.#events, offers: this.#offers});
  }
}
