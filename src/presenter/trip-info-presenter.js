import { SortType } from '../const.js';
import { RenderPosition, remove, render, replace } from '../framework/render.js';
import { SortRules } from '../utils/event.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #infoContainer = null;
  #tripInfoComponent = null;

  constructor({eventsModel, offersModel, destinationsModel, infoContainer}) {
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
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
    return this.#offersModel.offers.flatMap((item) => item.offers);
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    if (!this.events.length) {
      if (this.#tripInfoComponent) {
        remove(this.#tripInfoComponent);
      }
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
