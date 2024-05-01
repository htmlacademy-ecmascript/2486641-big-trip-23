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

  renderEvent(event){
    render(new EventView({event}), this.eventListComponent.getElement());
  }

  renderAddEvent(){
    render(new AddEventView(), this.eventListComponent.getElement());
  }

  renderEditEvent(){
    render(new EditEventView(), this.eventListComponent.getElement());
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];

    this.renderEventList();
    //this.renderEditEvent();
    for (let i = 0; i < this.events.length; i++){
      this.renderEvent(this.events[i]);
    }
  }
}
