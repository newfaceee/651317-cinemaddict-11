import PageController from './controllers/page.js';
import FilmsSectionComponent from './components/films-section.js';
import StatisticComponent from './components/statistic.js';
import NavigationComponent from './components/navigation.js';
import ProfileRatingComponent from './components/profile-rating.js';
import FooterStatisticsComponent from './components/footerStatistics.js';
import {generateUserProfile} from './mock/user-profile.js';
import {generateNavigations} from './mock/navigation.js';
import {render, RenderPosition, replace} from './utils/render.js';
import {filmCards, filmCardsCount} from './controllers/page.js';

// генерация моковых данных
const userProfile = generateUserProfile();
const navigations = generateNavigations();
// Основные элементы разметки

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);
const filmsSectionComponent = new FilmsSectionComponent();
// Рендер рейтинга, меню навигации и меню сортировки
render(siteHeaderElement, new ProfileRatingComponent(userProfile), RenderPosition.BEFOREEND);
const renderNavigation = (navigationElements) => {
  const navigationComponent = new NavigationComponent(navigationElements);
  const statisticComponent = new StatisticComponent(userProfile);
  navigationComponent.setClickHandler(`.main-navigation__additional`, () => {
    replace(filmsSectionComponent, statisticComponent);
  });
  // console.log(navigationComponent.getElement());
  navigationComponent.setClickHandler(`[href="#All movies"]`, () => {
    replace(statisticComponent, filmsSectionComponent);
  });


  render(siteMainElement, navigationComponent, RenderPosition.BEFOREEND);
};
renderNavigation(navigations);
// render(siteMainElement, new NavigationComponent(navigations), RenderPosition.BEFOREEND);
// render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);
render(siteFooterStatisticsElement, new FooterStatisticsComponent(filmCardsCount), RenderPosition.BEFOREEND);


const pageController = new PageController(siteMainElement);
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);
pageController.render(filmCards);

