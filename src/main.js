import PageController from './controllers/page.js';
import FilterController from './controllers/filter.js';
import SortController from './controllers/sort.js';
import ProfileRatingComponent from './components/profile-rating.js';
import StatisticComponent from './components/statistic.js';
import FooterStatisticsComponent from './components/footerStatistics.js';
import {generateUserProfile} from './mock/user-profile.js';
import {generateFilmCards} from './mock/film-cards.js';
import {generateComments} from './mock/comment.js';
import MoviesModel from './models/movie.js';
import CommentsModel from './models/comments.js';
import {render, RenderPosition} from './utils/render.js';
import User from './models/user.js';


const FILM_CARD_COUNT = 17;

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const filmCardsCount = filmCards.length;
const comments = generateComments(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);

const moviesModel = new MoviesModel();
moviesModel.setMovies(filmCards);
const watchedMovies = moviesModel.getWatchedMovies();
const userProfile = generateUserProfile(watchedMovies);
const userModel = new User();
userModel.setUser(userProfile);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

render(siteHeaderElement, new ProfileRatingComponent(userProfile), RenderPosition.BEFOREEND);

render(siteFooterStatisticsElement, new FooterStatisticsComponent(filmCardsCount), RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMainElement, moviesModel);
const sortController = new SortController(siteMainElement, moviesModel);
const pageController = new PageController(siteMainElement, moviesModel, commentsModel);
const statsComponent = new StatisticComponent(userModel, moviesModel);

sortController.render();
filterController.render();
pageController.render(filmCards);
render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
statsComponent.hide();
