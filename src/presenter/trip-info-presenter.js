import { SortType } from '../const.js';
import { RenderPosition, remove, render, replace } from '../framework/render.js';
import { SortRules } from '../utils/event.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #eventsModel = null;
  #infoContainer = null;
  #tripInfoComponent = null;

  constructor({eventsModel, infoContainer}) {
    this.#eventsModel = eventsModel;
    this.#infoContainer = infoContainer;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  get events() {
    return this.#eventsModel.events.sort(SortRules[SortType.DAY]);
  }

  get offers() {
    return this.#eventsModel.offers.flatMap((item) => item.offers);
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  init() {
    if (!this.events.length && this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
      return;
    }
    if (!this.events.length || this.#eventsModel.isUnavailableServer) {
      return;
    }
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      events: this.events,
      offers: this.offers,
      destinations: this.destinations,
    });
    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }
}
