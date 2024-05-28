import { getMockEvents } from '../mock/event.js';
import Observable from '../framework/observable.js';

export default class EventsModel extends Observable {
  #events = getMockEvents();

  get events() {
    return this.#events;
  }

}
