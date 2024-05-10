import { getMockEvents } from '../mock/event.js';
import { getMockDestinations } from '../mock/destination.js';
import { getMockOffers } from '../mock/offer.js';

export default class EventsModel {
  #events = getMockEvents();
  #destinations = getMockDestinations();
  #offers = getMockOffers();

  constructor(){}

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  getOffers(type) {
    if (type) {
      return this.#offers.find((element) => element.type === type).offers;
    }
    return this.#offers;
  }

  getDestination = (id) => this.#destinations.find((element) => element.id === id);

  getOffer = (type, id) => this.getOffers(type).find((element) => element.id === id);

  get cities () {
    return this.#destinations.map((element) => element.name);
  }
}
