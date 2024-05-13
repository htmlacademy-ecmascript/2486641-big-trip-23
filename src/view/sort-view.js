import AbstractView from '../framework/view/abstract-view.js';

const createSortTemplate = (sortItems) => {
  const sortElements = sortItems.map((item) =>
    `<div class="trip-sort__item  trip-sort__item--${item.value}">
      <input id="sort-${item.value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.value}">
      <label class="trip-sort__btn" for="sort-${item.value}">${item.label}</label>
    </div>`).join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortElements}
    </form>`
  );
};

export default class SortView extends AbstractView {
  #sortItems = null;
  constructor (sortItems) {
    super();
    this.#sortItems = sortItems;
  }

  get template() {
    return createSortTemplate(this.#sortItems);
  }

}
