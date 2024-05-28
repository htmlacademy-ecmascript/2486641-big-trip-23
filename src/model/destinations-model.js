import { getMockDestinations } from '../mock/destination.js';
import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = getMockDestinations();

  get destinations() {
    return this.#destinations;
  }

  getDestination = (id) => this.#destinations.find((element) => element.id === id);

}
