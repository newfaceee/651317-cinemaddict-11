import {MONTH_NAMES, COMMENTS_EMOJIS} from '../const.js';
import {transformDuration} from '../utils.js';

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
const createGenresMarkup = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};
const createEmojisMarkup = (emoji) => {
  return (`<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
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

const createFilmDetailsPopupMarkup = ({title, poster, originalTitle, comments, adult, rating, director, writers, actors, genres, country, duration, releaseDate, overview}) => {
  const genresMarkup = genres.map((genre) => {
    return createGenresMarkup(genre);
  }).join(`\n`);

  const emojisMarkup = COMMENTS_EMOJIS.map((emoji) => {
    return createEmojisMarkup(emoji);
  }).join(`\n`);

  const commentsMarkup = comments.map((comment) => {
    return createCommentsMarkup(comment);
  }).join(`\n`);

  const controlsMarkup = popupControls.map((control) => {
    return createControlsMarkup(control);
  }).join(`\n`);

  return (`<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
  
            <p class="film-details__age">${adult ? `18+` : ``}</p>
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
                <td class="film-details__cell">${releaseDate.getDate()} ${MONTH_NAMES[releaseDate.getMonth() + 1]} ${releaseDate.getFullYear()}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${transformDuration(duration)}</td>
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
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
  
          <ul class="film-details__comments-list">
            ${commentsMarkup}
          </ul>
  
          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>
  
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
  
            <div class="film-details__emoji-list">
              ${emojisMarkup}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`);
};

export const createFilmsDetailsPopupTemplate = (filmCard) => {
  return createFilmDetailsPopupMarkup(filmCard);
};
