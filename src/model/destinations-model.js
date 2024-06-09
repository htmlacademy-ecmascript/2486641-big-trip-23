import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #destinationsApiService = null;
  isUnavailableServer = false;

  constructor({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch(err) {
      this.isUnavailableServer = true;
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }
}
