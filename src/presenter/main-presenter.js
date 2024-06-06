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

  #newEventButtonComponent = null;
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
    this.#newEventButtonComponent = new NewEventButtonView({
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
        this.#newEventButtonComponent.element.disabled = false;
        this.#renderPage();
        break;
    }
  };

  #handleNewEventButtonClick = () => {
    this.#newEventButtonComponent.element.disabled = true;
    this.#eventListPresenter.createEvent();
  };

  #handleNewEventFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListContainer);
  }

  #renderNewEventButton(){
    render(this.#newEventButtonComponent, this.#newEventButtonContainer);
  }

  async init() {
    this.#filterPresenter.init();
    this.#newEventButtonComponent.element.disabled = true;
    this.#renderNewEventButton();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderPage();
  }

}
