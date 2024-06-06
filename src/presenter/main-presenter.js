import { UpdateType } from '../const';
import { remove, render } from '../framework/render.js';
import LoadingView from '../view/loading-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import EventListPresenter from './event-list-presenter.js';
import FilterPresenter from './filter-presenter';
import TripInfoPresenter from './trip-info-presenter';

export default class MainPresenter {
  #eventListPresenter = null;
  #filterPresenter = null;
  #tripInfoPresenter = null;

  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  _newEventButtonComponent = null;
  #newEventButtonContainer = null;
  #loadingComponent = new LoadingView();
  #eventListContainer = null;

  #isLoading = true;

  constructor({
    eventsModel,
    destinationsModel,
    offersModel,
    filterModel,
    eventListContainer,
    filterContainer,
    tripMainContainer,
    newEventButtonContainer
  }) {
    this.#destinationsModel = destinationsModel;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#newEventButtonContainer = newEventButtonContainer;
    this.#eventListContainer = eventListContainer;

    this.#eventListPresenter = new EventListPresenter({
      container: eventListContainer,
      eventsModel: this.#eventsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      filterModel: this.#filterModel,
      onNewEventDestroy: this.#handleNewEventFormClose,
    });
    this.#filterPresenter = new FilterPresenter({
      filterContainer,
      filterModel: this.#filterModel,
      eventsModel: this.#eventsModel,
    });
    this.#tripInfoPresenter = new TripInfoPresenter({
      eventsModel: this.#eventsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      infoContainer: tripMainContainer
    });
    this._newEventButtonComponent = new NewEventButtonView({
      onClick: this.#handleNewEventButtonClick,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  #renderPage() {
    this.#tripInfoPresenter.init();
    this.#eventListPresenter.init();
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this._newEventButtonComponent.element.disabled = false;
        this.#renderPage();
        break;
    }
  };

  #handleNewEventButtonClick() {
    //console.log(this.#eventListPresenter);
    //this.#eventListPresenter.createEvent();
    console.log(this._newEventButtonComponent);
    this._newEventButtonComponent.element.disabled = true;
  }

  #handleNewEventFormClose() {
    this._newEventButtonComponent.element.disabled = false;
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListContainer);
  }

  #renderNewEventButton(){
    render(this._newEventButtonComponent, this.#newEventButtonContainer);
  }

  async init() {
    this.#filterPresenter.init();
    this._newEventButtonComponent.element.disabled = true;
    this.#renderNewEventButton();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderPage();
  }

}
