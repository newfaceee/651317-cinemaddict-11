import AbstractComponent from "./abstract-component";

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
const createAddEmojiMarkup = () => {
  return (`<div for="add-emoji" class="film-details__add-emoji-label">
  <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
</div>`);
};

const createEmojiListMarkup = ({name, checked}) => {
  const isChecked = checked ? `checked` : ``;
  return (`<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}" ${isChecked}>
  <label class="film-details__emoji-label" for="emoji-${name}">
    <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
  </label>`);
};

const createNewCommentTemplate = () => {
  const emojiListMarkup = emojis.map((emoji) => {
    return createEmojiListMarkup(emoji);
  }).join(`\n`);
  const addEmojiMarkup = createAddEmojiMarkup();
  return (`<div class="film-details__new-comment">
  ${addEmojiMarkup}
  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
  </label>

  <div class="film-details__emoji-list"> 
    ${emojiListMarkup}
  </div>
</div>`)
};

export default class NewComment extends AbstractComponent {
  getTemplate() {
    return createNewCommentTemplate();
  }

  setEmojiChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      console.log(evt.target);
      handler();
    });
  }
}