import AbstractSmartComponent from './abstract-smart-component.js';

export const emojis = [{
  name: `smile`,
  isChecked: false,
},
{
  name: `sleeping`,
  isChecked: false,
},
{
  name: `puke`,
  isChecked: false,
},
{
  name: `angry`,
  isChecked: false,
}
];
const createCommentsListMarkup = ({text, emoji, date, author, commentId}) => {
  return (`<li data-comment-id=${commentId} class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`);
};

const createCommentsTemplate = (comment) => {
  const commentsListMarkup = createCommentsListMarkup(comment);
  return (`${commentsListMarkup}`);
};

export default class Comments extends AbstractSmartComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  setDeleteButtonClickHandler(handler) {
    const comments = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    for (const comment of comments) {
      comment.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const commentId = evt.target.closest(`.film-details__comment`).dataset.commentId;
        handler(commentId);
      });
    }
  }
}
