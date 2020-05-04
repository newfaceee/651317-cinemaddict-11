import AbstractComponent from "./abstract-component";
import {EMOJIS} from '../const.js';

const createAddEmojiMarkup = (checkedEmojiIndex) => {
  const isActiveEmoji = checkedEmojiIndex === -1 ? `` : `<img src="images/emoji/${EMOJIS[checkedEmojiIndex]}.png" width="55" height="55" alt="emoji-${EMOJIS[checkedEmojiIndex]}">`;
  return (`<div for="add-emoji" class="film-details__add-emoji-label">
  ${isActiveEmoji}
</div>`);
};

const createEmojiListMarkup = ({name, checked}) => {
  const isChecked = checked ? `checked` : ``;
  return (`<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}" ${isChecked}>
  <label class="film-details__emoji-label" for="emoji-${name}">
    <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
  </label>`);
};

const createNewCommentTemplate = (emojis) => {
  console.log(emojis);
  const emojiListMarkup = emojis.map((emoji) => {
    return createEmojiListMarkup(emoji);
  }).join(`\n`);
  const checkedEmojiIndex = emojis.findIndex((emoji) => emoji.active === true);
  const addEmojiMarkup = createAddEmojiMarkup(checkedEmojiIndex);
  return (`<div class="film-details__new-comment">
  ${addEmojiMarkup}
  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>

  <div class="film-details__emoji-list"> 
    ${emojiListMarkup}
  </div>
</div>`)
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
}