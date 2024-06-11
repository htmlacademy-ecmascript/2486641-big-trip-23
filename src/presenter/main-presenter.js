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
  #filterModel = null;

  #newEventButtonComponent = null;
  #newEventButtonContainer = null;
  #loadingComponent = new LoadingView();
  #eventListContainer = null;

  #isLoading = true;

  constructor({
    eventsModel,
    filterModel,
    eventListContainer,
    filterContainer,
    tripMainContainer,
    newEventButtonContainer
  }) {
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#newEventButtonContainer = newEventButtonContainer;
    this.#eventListContainer = eventListContainer;

    this.#eventListPresenter = new EventListPresenter({
      container: eventListContainer,
      eventsModel: this.#eventsModel,
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
        if (!this.#eventsModel.isUnavailableServer) {
          this.#newEventButtonComponent.element.disabled = false;
        }
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
    this.#eventListPresenter.renderMessage();
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListContainer);
  }

  #renderNewEventButton(){
    render(this.#newEventButtonComponent, this.#newEventButtonContainer);
  }

  init() {
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
