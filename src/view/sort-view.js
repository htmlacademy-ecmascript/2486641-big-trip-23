import AbstractView from '../framework/view/abstract-view.js';

const createSortTemplate = (sortItems, currentSortType) => {
  let sortElements = '';
  Object.entries(sortItems).forEach(([key, value]) => {
    sortElements += `<div class="trip-sort__item  trip-sort__item--${key}">
        <input id="sort-${key}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
        value="sort-${key}"
        data-sort-type="${key}"
        ${value.available ? '' : 'disabled'}
        ${key === currentSortType ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${key}">${value.label}</label>
      </div>`;
  });

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortElements}
    </form>`
  );
};

export default class SortView extends AbstractView {
  #sortItems = null;
  #handleSortTypeChange = null;
  #currentSortType = null;
  constructor ({sortItems, onSortTypeChange, currentSortType}) {
    super();
    this.#sortItems = sortItems;
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortTypeClickHandler);
  }

  get template() {
    return createSortTemplate(this.#sortItems, this.#currentSortType);
  }

  #sortTypeClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT' || !this.#sortItems[evt.target.dataset.sortType].available) {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
