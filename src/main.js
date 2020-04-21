import PageController from './controllers/page.js';
import FilmsSectionComponent from './components/films-section.js';
import NavigationComponent from './components/navigation.js';
import ProfileRatingComponent from './components/profile-rating.js';
import SortComponent from './components/sort.js';
import FooterStatisticsComponent from './components/footerStatistics.js';
import {generateUserProfile} from './mock/user-profile.js';
import {generateNavigations} from './mock/navigation.js';
import {render, RenderPosition} from './utils/render.js';
import {filmCards, filmCardsCount} from './controllers/page.js';

// генерация моковых данных
const userProfile = generateUserProfile();
const navigations = generateNavigations();
// Основные элементы разметки

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);

// Рендер рейтинга, меню навигации и меню сортировки
render(siteHeaderElement, new ProfileRatingComponent(userProfile), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent(navigations), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);
render(siteFooterStatisticsElement, new FooterStatisticsComponent(filmCardsCount), RenderPosition.BEFOREEND);


const filmsSectionComponent = new FilmsSectionComponent();
const pageController = new PageController(filmsSectionComponent);
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);
pageController.render(filmCards);
