import {MONTH_NAMES} from '../const.js';
import {transformDuration} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';


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

const createControlsMarkup = ({name, text}) => {
  return (`<input type="checkbox" class="film-details__control-input visually-hidden" id=${name} name=${name}>
  <label for=${name} class="film-details__control-label film-details__control-label--${name}">${text}</label>`);
};

const createFilmDetailsPopupMarkup = ({title, poster, originalTitle, adult, rating, director, writers, actors, genres, country, duration, releaseDate, overview}) => {
  const posterName = `${poster.split(` `).join(`-`)}.jpg`;
  const isAdult = adult ? `18+` : ``;
  const fullReleaseDate = `${releaseDate.getDate()} ${MONTH_NAMES[releaseDate.getMonth() + 1]} ${releaseDate.getFullYear()}`;
  const [hours, minutes] = transformDuration(duration);
  const genresMarkup = genres.map((genre) => {
    return createGenresMarkup(genre);
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

export default class FilmDetailsPopup extends AbstractSmartComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._clickClosePopupHandler = null;
    // Подписывается на все события происходящие в попапе
    this._subsribeOnEvents();
    this.rerender = this.rerender.bind(this);
  }

  getTemplate() {
    return createFilmsDetailsPopupTemplate(this._filmCard, this._comments);
  }
  setClickClosePopupHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._clickClosePopupHandler = handler;
  }

  recoveryListeners() {
    this.setClickClosePopupHandler(this._clickClosePopupHandler);
    this._subsribeOnEvents();
  }
  rerender() {
    super.rerender();
  }

  _subsribeOnEvents() {
    // const popupElement = this.getElement();
    // const emojisListElement = popupElement.querySelector(`.film-details__emoji-list`);
    // const emojiLabelsElement = Array.from(emojisListElement.querySelectorAll(`.film-details__emoji-label`));
    // emojisListElement.addEventListener(`click`, (evt) => {
    //   // Находим клик только по изображению
    //   if (evt.target.tagName !== `IMG`) {
    //     return;
    //   }
    //   // Находим индекс изображения по которому осуществлен клик
    //   const clickedEmojiIndex = emojiLabelsElement.findIndex((it) => it === evt.target.parentElement);
    //   // Проходим по всем смайликам, и если индекс смайлика по которому осуществлен клик
    //   // совпадает с индексом текущего, меняем его свойство isChecked на !isChecked,
    //   // остальным смайликам задаем свойство isChecked = false
    //   emojis.map((emoji, index) => {
    //     if (clickedEmojiIndex === index) {
    //       emoji.isChecked = !emoji.isChecked;
    //       return emoji;
    //     } else {
    //       emoji.isChecked = false;
    //       return emoji;
    //     }
    //   });
    //   this.rerender();
    // });
  }
}
