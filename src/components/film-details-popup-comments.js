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
const createCommentsMarkup = ({text, emoji, date, author}) => {
  return (`<li class="film-details__comment">
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

const createAddEmojiLabelMarkup = (emojiIndex) => {
  return (`<div for="add-emoji" class="film-details__add-emoji-label">
     
    </div>`);
};

const createEmojiListMarkup = ({name, isChecked}) => {
  const checked = isChecked ? `checked` : ``;
  return (`<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}" ${checked}>
  <label class="film-details__emoji-label" for="emoji-${name}">
    <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
  </label>`)
}

const createCommentsTemplate = ({comments}) => {
  const commentsMarkup = comments.map((comment) => createCommentsMarkup(comments));
  const addEmojiLabelMarkup = createAddEmojiLabelMarkup();
  const emojiListMarkup = emojis.map((emoji) => createEmojiListMarkup(emoji));
  return (`<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  ${addEmojiLabelMarkup}
  <ul class="film-details__comments-list">
    ${commentsMarkup}
  </ul>
  <div class="film-details__new-comment">
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>
    <div class="film-details__emoji-list">
      ${emojiListMarkup}
    </div>
  </div>
</section>`)
}

export default class Comments extends AbstractSmartComponent {
  constructor(comments) {
    super();
    this._comments = comments;

    // this._subsribeOnEvents();
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  recoveryListeners() {
    this._subsribeOnEvents();
  }

  rerender() {
    super.rerender();
  }
}

// recoveryListeners() {
//   this.setClickClosePopupHandler(this._clickClosePopupHandler);
//   this._subsribeOnEvents();
// }
// rerender() {
//   super.rerender();
// }
// _subsribeOnEvents() {
//   const popupElement = this.getElement();
//   const emojisListElement = popupElement.querySelector(`.film-details__emoji-list`);
//   const emojiLabelsElement = Array.from(emojisListElement.querySelectorAll(`.film-details__emoji-label`));
//   emojisListElement.addEventListener(`click`, (evt) => {
//     // Находим клик только по изображению
//     if (evt.target.tagName !== `IMG`) {
//       return;
//     }
//     // Находим индекс изображения по которому осуществлен клик
//     const clickedEmojiIndex = emojiLabelsElement.findIndex((it) => it === evt.target.parentElement);
//     // Проходим по всем смайликам, и если индекс смайлика по которому осуществлен клик
//     // совпадает с индексом текущего, меняем его свойство isChecked на !isChecked,
//     // остальным смайликам задаем свойство isChecked = false
//     emojis.map((emoji, index) => {
//       if (clickedEmojiIndex === index) {
//         emoji.isChecked = !emoji.isChecked;
//         return emoji;
//       } else {
//         emoji.isChecked = false;
//         return emoji;
//       }
//     });
//     this.rerender();
//   });
// }