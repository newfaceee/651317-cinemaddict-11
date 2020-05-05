import AbstractComponent from './abstract-component.js';

const createCommentsListTemplate = () => {
  return (`<ul class="film-details__comments-list"></ul>`);
};

export default class CommentsList extends AbstractComponent {
  getTemplate() {
    return createCommentsListTemplate();
  }
}
