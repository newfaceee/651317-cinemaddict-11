import AbstractComponent from './abstract-component.js';

const createComponentTemplate = () => {
  return (`<form class="film-card__controls">
    </form>`);
};

export default class Component extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return createComponentTemplate();
  }
}
