import { getMockOffers } from '../mock/offer.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = getMockOffers();

  get offers() {
    return this.#offers;
  }

  getOffers(type) {
    if (type) {
      return this.#offers.find((element) => element.type === type).offers;
    }
    return this.#offers;
  }

  getOffer = (type, id) => this.getOffers(type).find((element) => element.id === id);

}
