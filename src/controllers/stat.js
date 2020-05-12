import StatisticComponent from '../components/statistic.js';
import {render, RenderPosition} from '../utils/render.js';

export default class StatisticController {
  constructor(container, userModel, moviesModel) {

    this._container = container;
    this._userModel = userModel;
    this._moviesModel = moviesModel;

    this._statisticComponent = null;
  }

  hide() {
    this._statisticComponent.hide();
  }

  show() {
    this._statisticComponent.show();
  }

  render() {
    const container = this._container;
    this._statisticComponent = new StatisticComponent(this._userModel, this._moviesModel);

    render(container, this._statisticComponent, RenderPosition.BEFOREEND);
  }
}
