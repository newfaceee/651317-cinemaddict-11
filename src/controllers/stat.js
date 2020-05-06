// import StatisticComponent from '../components/statistic.js';
// import {render, RenderPosition} from '../utils/render.js';

// export default class StatController {
//   constructor(container, userModel, moviesModel) {
//     this._container = container;
//     this._userModel = userModel;
//     this._moviesModel = moviesModel;

//     this._statisticComponent = null;
//   }

//   render() {
//     const container = this._container;
//     const userProfile = this._userModel.getUser();
//     this._statisticComponent = new StatisticComponent(userProfile);

//     render(container, this._statisticComponent, RenderPosition.BEFOREEND);
//   }
// }