import {SortType} from '../const.js';
import {render, replace, RenderPosition, remove} from '../utils/render.js';
import SortComponent from '../components/sort.js';

export default class SortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._filterComponent = null;
    this._activeSortType = SortType.DEFAULT;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.setDataChangeHandlers(this._onDataChange);
  }

  render() {
    this._activeSortType = this._moviesModel.getActiveSortType();
    const container = this._container;
    const movies = this._moviesModel.getMoviesAll();
    const sortTypes = Object.values(SortType).map((sortType) => {
      return {
        name: sortType,
        active: sortType === this._activeSortType,
      };
    });
    console.log(sortTypes);
    const oldComponent = this._sortComponent;
    this._sortComponent = new SortComponent(sortTypes);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    if (oldComponent) {
      replace(oldComponent, this._sortComponent);
    } else {
      render(container, this._sortComponent, RenderPosition.BEFOREEND);
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _onSortTypeChange(sortType) {
    this._activeSortType = sortType;
    this._moviesModel.setSortType(sortType);
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}