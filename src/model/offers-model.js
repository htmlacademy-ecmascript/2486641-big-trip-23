import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = [];
  #offersApiService = null;
  isUnavailableServer = false;

  constructor({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      this.isUnavailableServer = true;
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  }
}
