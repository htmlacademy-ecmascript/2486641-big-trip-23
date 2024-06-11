import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filters, currentFilterType) => {
  const filterElements = filters.map((filter) =>
    `<div class="trip-filters__filter">
      <input id="filter-${filter.type}" 
      class="trip-filters__filter-input 
      visually-hidden" type="radio" 
      name="trip-filter" value="${filter.type}" 
      ${filter.count === 0 ? 'disabled' : ''}
      ${filter.type === currentFilterType ? 'checked' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${filter.type}">
      ${filter.type}
      </label>
    </div>`).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterElements}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #handleFilterTypeChange = null;
  #currentFilter = null;
  constructor ({filters, onFilterTypeChange, currentFilterType}) {
    super();
    this.#filters = filters;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.#currentFilter = currentFilterType;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

}
