import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filters) => {
  const filterElements = filters.map((filter) =>
    `<div class="trip-filters__filter">
      <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${filter.count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
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
  constructor (filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

}
