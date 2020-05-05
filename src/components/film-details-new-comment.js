import AbstractComponent from "./abstract-component.js";

const createEmojiListMarkup = ({name, checked}) => {
  const isChecked = checked ? `checked` : ``;
  return (`<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}" ${isChecked}>
  <label class="film-details__emoji-label" for="emoji-${name}">
    <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
  </label>`);
};

const createNewCommentTemplate = (emojis) => {
  const emojiListMarkup = emojis.map((emoji) => {
    return createEmojiListMarkup(emoji);
  }).join(`\n`);
  return (`<div class="film-details__new-comment">
  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>

  <div class="film-details__emoji-list"> 
    ${emojiListMarkup}
  </div>
</div>`);
};

export default class NewComment extends AbstractComponent {
  constructor(emojis) {
    super();
    this._emojis = emojis;
  }
  getTemplate() {
    return createNewCommentTemplate(this._emojis);
  }

  setEmojiChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }
      const activeEmoji = evt.target.value;
      handler(activeEmoji);
    });
  }

  setSubmitFormHandler(handler) {

    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, (evt) => {
      if (evt.ctrlKey && evt.keyCode === 13) {
        const commentEmotionElement = this.getElement().querySelector(`.film-details__add-emoji-label img`);
        const commentText = this.getElement().querySelector(`.film-details__comment-input`).value;
        if (commentEmotionElement && commentText.length !== 0) {
          const emotion = commentEmotionElement.alt.split(`-`)[1];
          handler(emotion, commentText);
        } else {
          return;
        }
      } else {
        return;
      }
    });
  }
}
