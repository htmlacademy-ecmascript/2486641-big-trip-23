import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createSortTemplate = (sortItems) => {
  // const sortElements = sortItems.map((item) =>
  //   `<div class="trip-sort__item  trip-sort__item--${item.value}">
  //     <input id="sort-${item.value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.value}" ${item.available ? '' : 'disabled'}>
  //     <label class="trip-sort__btn" for="sort-${item.value}" data-sort-type="${SortType[item.value]}">${item.label}</label>
  //   </div>`).join('');
  let sortElements = '';
  sortItems.forEach((value, key) => {
    sortElements += `<div class="trip-sort__item  trip-sort__item--${key}">
        <input id="sort-${key}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${key}" ${value.available ? '' : 'disabled'}>
        <label class="trip-sort__btn" for="sort-${key}" data-sort-type="${SortType[key]}">${value.label}</label>
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
  constructor ({sortItems, onSortTypeChange}) {
    super();
    this.#sortItems = sortItems;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL' || !this.#sortItems.get(evt.target.dataset.sortType).available) {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortTemplate(this.#sortItems);
  }

}
