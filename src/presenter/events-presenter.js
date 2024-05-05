import { EVENT_TYPES } from '../const.js';
import { render } from '../render.js';
import { getRandomArrayElement } from '../utils.js';
import AddEventView from '../view/add-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';

export default class EventListPresenter {
  eventListComponent = new EventListView();

  constructor({container, eventsModel}) {
    this.container = container;
    this.eventsModel = eventsModel;
  }

  renderEventList(){
    render(this.eventListComponent, this.container);
  }

  renderEvent(event, destination, offersInfo){
    render(new EventView(event, destination, offersInfo), this.eventListComponent.getElement());
  }

  renderAddEvent(){
    render(new AddEventView(), this.eventListComponent.getElement());
  }

  renderEditEvent(event, destination, offersInfo, cities){
    render(new EditEventView(event, destination, offersInfo, EVENT_TYPES, cities), this.eventListComponent.getElement());
  }

  init() {
    this.events = this.eventsModel.getEvents();
    this.destinations = this.eventsModel.getDestinations();
    this.offers = this.eventsModel.getOffers();

    const randomEvent = getRandomArrayElement(this.events);
    const offersAvailable = this.eventsModel.getOffer(randomEvent.type);
    const randomEventDestination = this.eventsModel.getDestination(randomEvent.destination);
    const cities = this.eventsModel.getCities();
    this.renderEditEvent(randomEvent, randomEventDestination, offersAvailable, cities);

    this.renderEventList();
    for (const event of this.events){
      const destination = this.eventsModel.getDestination(event.destination);
      const offersInfo = event.offers.map((element) => this.eventsModel.getOffer(event.type, element));
      this.renderEvent(event, destination, offersInfo);
    }
  }
}
