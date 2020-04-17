import {capitalizeFirstLetters} from "../utils";

const createProfileRatingMarkup = ({rank, avatar}) => {
  const profileRating = capitalizeFirstLetters(rank).join(` `);
  return (`<p class="profile__rating">${profileRating}</p>
  <img class="profile__avatar" src="images/${avatar}" alt="Avatar" width="35" height="35">`);
};

const createProfileRatingTemplate = (profile) => {
  const profileMarkup = createProfileRatingMarkup(profile);
  return (`<section class="header__profile profile">
          ${profileMarkup}
        </section>`);
};
export default class ProfileRating {
  constructor(profile) {
    this._profile = profile;

    this._element = null;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._profile);
  }

  getElement() {
    if (!this._element) {
      this._element = createProfileRatingTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
