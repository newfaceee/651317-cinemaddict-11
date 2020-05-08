import API from './api.js';

import ProfileRatingComponent from './components/profile-rating.js';
import StatisticComponent from './components/statistic.js';
import FooterStatisticsComponent from './components/footerStatistics.js';

import PageController from './controllers/page.js';
import FilterController from './controllers/filter.js';
import SortController from './controllers/sort.js';

import {generateUserProfile} from './mock/user-profile.js';
import {generateFilmCards} from './mock/film-cards.js';
import {generateComments} from './mock/comment.js';

import MoviesModel from './models/movies.js';
import CommentsModel from './models/comments.js';
import User from './models/user.js';

import {render, RenderPosition} from './utils/render.js';

const AUTHORIZATION = `Basic adkljgfjsdgkl`;
const FILM_CARD_COUNT = 17;

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const filmCardsCount = filmCards.length;
const comments = generateComments(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);

const changeScreenStatHandler = () => {
  pageController.hide();
  sortController.hide();
  statsComponent.show();
};

const changeScreenMovieHandler = () => {
  pageController.show();
  sortController.show();
  statsComponent.hide();
};
const moviesModel = new MoviesModel();
const api = new API(AUTHORIZATION);
api.getMovies().then((data) => {
  moviesModel.setMovies(data);
});


// moviesModel.setMovies(filmCards);
// const watchedMovies = moviesModel.getWatchedMovies();
// const userProfile = generateUserProfile(watchedMovies);
// const userModel = new User();
// userModel.setUser(userProfile);

// const commentsModel = new CommentsModel();
// commentsModel.setComments(comments);

// const profileRatingComponent = new ProfileRatingComponent(userProfile);
// const footerStatisticsComponent = new FooterStatisticsComponent(filmCardsCount);

// const filterController = new FilterController(siteMainElement, moviesModel, changeScreenStatHandler, changeScreenMovieHandler);
// const sortController = new SortController(siteMainElement, moviesModel);
// const pageController = new PageController(siteMainElement, moviesModel, commentsModel, userModel);
// const statsComponent = new StatisticComponent(userModel, moviesModel);


// render(siteHeaderElement, profileRatingComponent, RenderPosition.BEFOREEND);
// render(siteFooterStatisticsElement, footerStatisticsComponent, RenderPosition.BEFOREEND);
// sortController.render();
// filterController.render();
// pageController.render(filmCards);
// render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
// statsComponent.hide();
