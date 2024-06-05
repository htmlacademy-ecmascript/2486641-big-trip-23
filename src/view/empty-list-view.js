import { NoTasksTextType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createEmptyListTemplate = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];
  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
};

export default class EmptyListView extends AbstractView{
  #filterType = null;

  constructor(filterType){
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
