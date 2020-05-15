import AbstractSmartComponent from './abstract-smart-component.js';
import {formatCommentDate} from '../utils/common.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

const createCommentMarkup = ({comment, emotion, date, author, id}) => {
  const formattedDate = formatCommentDate(date);

  return (`<li data-comment-id=${id} class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${formattedDate}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`);
};

const createCommentTemplate = (comment) => {
  const commentsListMarkup = createCommentMarkup(comment);
  return (`${commentsListMarkup}`);
};

export default class Comments extends AbstractSmartComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  setDeleteButtonClickHandler(handler) {
    const comments = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    for (const comment of comments) {
      comment.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const deleteButtonElement = evt.target;
        const commentId = deleteButtonElement.closest(`.film-details__comment`).dataset.commentId;
        handler(commentId, deleteButtonElement);
      });
    }
  }

  shake() {   
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
