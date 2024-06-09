import { FilterType, SortItems, SortType, TimeLimit, UpdateType, UserAction } from '../const.js';
import { RenderPosition, remove, render } from '../framework/render.js';
import { SortRules } from '../utils/event.js';
import { filter } from '../utils/filter.js';
import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class EventListPresenter {
  #eventListComponent = new EventListView();
  #sortComponent = null;
  #emptyListComponent = null;
  #container = null;
  #eventsModel = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #newEventPresenter = null;
  #onNewEventDestroy = null;
  #failedMessageComponent = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({container, eventsModel, filterModel, onNewEventDestroy}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#onNewEventDestroy = onNewEventDestroy;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    events.sort(SortRules[this.#currentSortType]);
    const filteredEvents = filter[this.#filterType](events);
    return filteredEvents;
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  get offers() {
    return this.#eventsModel.offers;
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    const currentPresenter = (update.id) ? this.#eventPresenters.get(update.id) : null;
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        currentPresenter.setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch(err) {
          currentPresenter.setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
          this.#newEventPresenter.destroy();
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        currentPresenter.setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch(err) {
          currentPresenter.setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList(true);
        this.#renderTrip();
        break;
    }
  };

  #renderEventContainer(){
    render(this.#eventListComponent, this.#container);
  }

  #renderEventList(){
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderSort(){
    this.#sortComponent = new SortView({
      sortItems: SortItems,
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderEmptyList(){
    this.#emptyListComponent = new EmptyListView(this.#filterType);
    render(this.#emptyListComponent, this.#container);
  }


  #renderFailedMessage(){
    remove(this.#emptyListComponent);
    this.#failedMessageComponent = new EmptyListView(this.#filterType, 'Failed to load latest route information');
    render(this.#failedMessageComponent, this.#container);
  }

  #renderEvent(event){
    const eventPresenter = new EventPresenter({
      eventListElement: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations: this.destinations,
      offers: this.offers,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderTrip() {
    this.#renderEventContainer();
    if (this.#eventsModel.isUnavailableServer) {
      this.#renderFailedMessage();
      return;
    }
    if (!this.events.length) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    this.#renderEventList();
  }

  #handleModeChange = () => {
    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
    }
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventList();
    this.#renderTrip();
  };

  #clearEventList(resetSortType = false) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortComponent);
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  init() {
    this.#renderTrip();
  }

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#newEventPresenter = new NewEventPresenter({
      eventListElement: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations: this.destinations,
      offers: this.offers,
      onDestroy: this.#onNewEventDestroy,
    });
    this.#newEventPresenter.init();
    remove(this.#emptyListComponent);
  }
}
