import { EVENT_TYPES } from '../const.js';
import { render } from '../render.js';
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

    this.renderEventList();
    for (let i = 0; i < this.events.length; i++){
      const event = this.events[i];
      const destination = this.eventsModel.getDestination(event.destination);
      const offersInfo = event.offers.map((element) => this.eventsModel.getOffer(event.type, element));
      if (i === 0) {
        const cities = this.eventsModel.getCities();
        this.renderEditEvent(event, destination, offersInfo, cities);
      }
      this.renderEvent(event, destination, offersInfo);
    }
  }
}
