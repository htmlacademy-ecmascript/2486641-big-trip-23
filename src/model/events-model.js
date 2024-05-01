import { getRandomEvent } from '../mock/event.js';

export default class EventsModel {
  events = Array.from({length: 10}, getRandomEvent);

  getEvents() {
    return this.events;
  }
}
