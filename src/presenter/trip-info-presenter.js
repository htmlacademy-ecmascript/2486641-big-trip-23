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
    const offers = [];
    this.#offersModel.offers.forEach((item) => offers.push(...item.offers));
    return offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
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


    // this.#tripInfoComponent = new TripInfoView({
    //   events: this.events
    // });
    // render(this.#tripInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
