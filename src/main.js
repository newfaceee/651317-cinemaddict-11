import PageController from './controllers/page.js';
import FilterController from './controllers/filter.js';
import SortController from './controllers/sort.js';
import FilmsSectionComponent from './components/films-section.js';
import StatisticComponent from './components/statistic.js';
import FilterComponent from './components/filter.js';
import ProfileRatingComponent from './components/profile-rating.js';
import FooterStatisticsComponent from './components/footerStatistics.js';
import {generateUserProfile} from './mock/user-profile.js';
import {generateNavigations} from './mock/navigation.js';
import {generateFilmCards} from './mock/film-cards.js';
import {generateComments} from './mock/comment.js';
import MoviesModel from './models/movie.js';
import CommentsModel from './models/comments.js';
import {render, RenderPosition, replace} from './utils/render.js';
import {getComments} from './utils/common.js';
import CommentsController from './controllers/comments.js';


const FILM_CARD_COUNT = 17;

// генерация моковых данных
const userProfile = generateUserProfile();
const filmCards = generateFilmCards(FILM_CARD_COUNT);
const filmCardsCount = filmCards.length;
const comments = generateComments(filmCards);

// Основные элементы разметки

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);
const filmsSectionComponent = new FilmsSectionComponent();
// Создаем инстанс модели фильма и комментариев и передаем моковые данные в модель
const moviesModel = new MoviesModel();
moviesModel.setMovies(filmCards);
const commentsModel = new CommentsModel();
commentsModel.setComments(comments);


// const commentsModel = new CommentsModel();

// commentsModel.setComments(comments);

// Рендер рейтинга, меню навигации и меню сортировки
render(siteHeaderElement, new ProfileRatingComponent(userProfile), RenderPosition.BEFOREEND);


render(siteFooterStatisticsElement, new FooterStatisticsComponent(filmCardsCount), RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMainElement, moviesModel);
const pageController = new PageController(siteMainElement, moviesModel, commentsModel);
const sortController = new SortController(siteMainElement, moviesModel);
sortController.render();
filterController.render();

pageController.render(filmCards);
