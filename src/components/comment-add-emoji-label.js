import AbstractComponent from './abstract-component.js';

const createAddEmojiLabelTemplate = (activeEmotion) => {
  const isExist = activeEmotion ? `<img src="images/emoji/${activeEmotion}.png" width="55" height="55" alt="emoji-${activeEmotion}">` : ``;
  return (`<div for="add-emoji" class="film-details__add-emoji-label">${isExist}</div>`)
}

export default class CommentAddEmojiLabel extends AbstractComponent {
  constructor(activeEmotion) {
    super();
    this._activeEmotion = activeEmotion;
  }
  getTemplate() {
    return createAddEmojiLabelTemplate(this._activeEmotion);
  }
}