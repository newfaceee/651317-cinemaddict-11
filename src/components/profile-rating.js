import {capitalizeFirstLetters} from "../utils/common.js";
import AbstractComponent from './abstract-component.js';

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
export default class ProfileRating extends AbstractComponent {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._profile);
  }

}
