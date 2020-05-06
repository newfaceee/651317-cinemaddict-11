import AbstractComponent from "./abstract-component";

const createNavigationTemplate = () => {
  return (`<nav class="main-navigation"></nav>
  <a data-id="stats" href="#stats" class="main-navigation__additional">Stats</a>`);
};

export default class SiteNavigation extends AbstractComponent {

  getTemplate() {
    return createNavigationTemplate();
  }
}
