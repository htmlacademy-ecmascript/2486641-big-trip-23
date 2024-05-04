import { getMockEvents } from '../mock/event.js';
import { getMockDestinations } from '../mock/destination.js';
import { getMockOffers } from '../mock/offer.js';

export default class EventsModel {
  constructor(){}
  events = getMockEvents();
  destinations = getMockDestinations();
  offers = getMockOffers();

  getEvents() {
    return this.events;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getDestination = (id) => {
    if (id) {
      return this.destinations.find((element) => element.id === id);
    }
  };

  getOffer = (type, id) => {
    const offers = this.offers.find((element) => element.type === type).offers;
    if (id) {
      return offers.find((element) => element.id === id);
    }
    return offers;
  };

  getCities = () => this.destinations.map((element) => element.name);

}
