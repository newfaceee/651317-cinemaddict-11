import {MONTH_NAMES} from '../const.js';
import {transformDuration} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';


const popupControls = [{
  name: `watchlist`,
  text: `Add to watchlist`,
},
{
  name: `watched`,
  text: `Already watched`,
},
{
  name: `favorite`,
  text: `Add to favorites`,
}
];
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
const createGenresMarkup = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};
const createEmojisMarkup = (emoji, isChecked) => {
  const isCheckedProperty = isChecked ? `checked` : ``;
  return (`<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isCheckedProperty}>
  <label class="film-details__emoji-label" for="emoji-smile">
    <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
  </label>`);
};
const createCommentsMarkup = ({text, emoji, date, author}) => {
  return (`<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-angry">
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
const createControlsMarkup = ({name, text}) => {
  return (`<input type="checkbox" class="film-details__control-input visually-hidden" id=${name} name=${name}>
  <label for=${name} class="film-details__control-label film-details__control-label--${name}">${text}</label>`);
};

const createAddEmojiLabelMarkup = (emojiIndex) => {
  const emoji = emojiIndex !== -1 ? emojis[emojiIndex].name : ``;
  const isEmoji = emojiIndex !== -1 ? `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">` : ``;
  return (`<div for="add-emoji" class="film-details__add-emoji-label">
      ${isEmoji}
    </div>`);
};
const createFilmDetailsPopupMarkup = ({title, poster, originalTitle, comments, adult, rating, director, writers, actors, genres, country, duration, releaseDate, overview}) => {
  const posterName = `${poster.split(` `).join(`-`)}.jpg`;
  const isAdult = adult ? `18+` : ``;
  const fullReleaseDate = `${releaseDate.getDate()} ${MONTH_NAMES[releaseDate.getMonth() + 1]} ${releaseDate.getFullYear()}`;
  const [hours, minutes] = transformDuration(duration);
  const checkedEmojiIndex = emojis.findIndex((it) => it.isChecked === true);
  const genresMarkup = genres.map((genre) => {
    return createGenresMarkup(genre);
  }).join(`\n`);

  const emojisMarkup = emojis.map(({name, isChecked}) => {
    return createEmojisMarkup(name, isChecked);
  }).join(`\n`);

  const commentsMarkup = comments.map((comment) => {
    return createCommentsMarkup(comment);
  }).join(`\n`);

  const controlsMarkup = popupControls.map((control) => {
    return createControlsMarkup(control);
  }).join(`\n`);

  const addEmojiLabelMarkup = createAddEmojiLabelMarkup(checkedEmojiIndex);
  return (`<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${posterName}" alt="">
  
            <p class="film-details__age">${isAdult}</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${writers.length > 1 ? `Writers` : `Writer`}</td>
                <td class="film-details__cell">${writers.join(` `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${actors.length > 1 ? `Actors` : `Actor`}</td>
                <td class="film-details__cell">${actors.join(` `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${fullReleaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${hours}h ${minutes}m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                <td class="film-details__cell">
                  ${genresMarkup}
                </td>
              </tr>
            </table>
  
            <p class="film-details__film-description">${overview}</p>
          </div>
        </div>
  
        <section class="film-details__controls">
          ${controlsMarkup}
        </section>
      </div>
  
      <div class="form-details__bottom-container">
      </div>
    </form>
  </section>`);
};

const createFilmsDetailsPopupTemplate = (filmCard) => {
  return createFilmDetailsPopupMarkup(filmCard);
};

export default class FilmDetailsPopup extends AbstractComponent {
  constructor(filmDetailsPopup) {
    super();
    this._filmDetailsPopup = filmDetailsPopup;
    this._clickClosePopupHandler = null;
  }
  getTemplate() {
    return createFilmsDetailsPopupTemplate(this._filmDetailsPopup);
  }
  setClickClosePopupHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._clickClosePopupHandler = handler;
  }
}
