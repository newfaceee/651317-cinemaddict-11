import {FilterType} from '../const.js';
import {getMoviesByFilter} from '../utils/filter.js';
import {render, replace, RenderPosition, remove} from '../utils/render.js';
import FilterComponent from '../components/filter.js';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeFilterType = FilterType.ALL;

    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.setDataChangeHandlers(this._onDataChange);
  }

  render() {
    const container = this._container;
    const movies = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filter) => {
      return {
        name: filter,
        count: getMoviesByFilter(movies, filter).length,
        active: filter === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);

    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    if (oldComponent) {
      replace(oldComponent, this._filterComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }

    render(container, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._moviesModel.setFilter(filterType);
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}