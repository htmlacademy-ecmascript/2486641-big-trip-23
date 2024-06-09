import { NoTasksTextType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createEmptyListTemplate = (filterType, failedMessage) => {
  const noTaskTextValue = (failedMessage) ? failedMessage : NoTasksTextType[filterType];
  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
};

export default class EmptyListView extends AbstractView{
  #filterType = null;
  #failedMessage = null;

  constructor(filterType, failedMessage = null){
    super();
    this.#filterType = filterType;
    this.#failedMessage = failedMessage;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType, this.#failedMessage);
  }
}
