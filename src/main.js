import API from './api.js';

import ProfileRatingComponent from './components/profile-rating.js';
import FooterStatisticsComponent from './components/footerStatistics.js';
import FilmsListLoadingComponent from './components/films-list-loading.js';

import PageController from './controllers/page.js';
import FilterController from './controllers/filter.js';
import SortController from './controllers/sort.js';
import StatisticController from './controllers/stat.js';

import {generateUserProfile} from './mock/user-profile.js';

import MoviesModel from './models/movies.js';
import CommentsModel from './models/comments.js';
import UserModel from './models/user.js';

import {render, RenderPosition} from './utils/render.js';


const AUTHORIZATION = `Basic adkljgfjsdgkl`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict/`;

const changeScreenStatHandler = () => {
  pageController.hide();
  sortController.hide();
  statisticController.show();
};

const changeScreenMovieHandler = () => {
  pageController.show();
  sortController.show();
  statisticController.hide();
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();
const userModel = new UserModel();
const commentsModel = new CommentsModel();

const filmsListLoadingComponent = new FilmsListLoadingComponent();

render(siteMainElement, filmsListLoadingComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement, moviesModel, commentsModel, userModel, api);
const sortController = new SortController(siteMainElement, moviesModel);
const filterController = new FilterController(siteMainElement, moviesModel, changeScreenStatHandler, changeScreenMovieHandler);
const statisticController = new StatisticController(siteMainElement, userModel, moviesModel);


api.getMovies().then((data) => {
  filmsListLoadingComponent.getElement().remove();
  moviesModel.setMovies(data);

  const userProfile = generateUserProfile(moviesModel.getWatchedMovies());
  userModel.setUser(userProfile);
  const profileRatingComponent = new ProfileRatingComponent(userProfile);
  const footerStatisticsComponent = new FooterStatisticsComponent(data.length);


  render(siteHeaderElement, profileRatingComponent, RenderPosition.BEFOREEND);
  render(siteFooterStatisticsElement, footerStatisticsComponent, RenderPosition.BEFOREEND);
  sortController.render();
  filterController.render();
  pageController.render();
  statisticController.render();
  statisticController.hide();
});
