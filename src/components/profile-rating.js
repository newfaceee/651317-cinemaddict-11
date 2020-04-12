import {capitalizeFirstLetters} from "../utils";

const createProfileRatingMarkup = ({rank, avatar}) => {
  const profileRating = capitalizeFirstLetters(rank).join(` `);
  return (`<p class="profile__rating">${profileRating}</p>
  <img class="profile__avatar" src="images/${avatar}" alt="Avatar" width="35" height="35">`);
};

export const createProfileRatingTemplate = (profile) => {
  const profileMarkup = createProfileRatingMarkup(profile);
  return (`<section class="header__profile profile">
          ${profileMarkup}
        </section>`);
};
