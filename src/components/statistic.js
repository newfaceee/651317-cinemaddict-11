import {capitalizeFirstLetters, transformDuration} from "../utils";

const filterNames = [
  `All time`, `Today`, `Week`, `Month`, `Year`
];
const statisticItemsTitle = [
  `You watched`, `Total duration`, `Top genre`
];
const createFiltersMarkup = (filter, isChecked) => {
  const id = filter.toLowerCase().split(` `).join(`-`);

  return (`<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${id}" value="${id}" ${isChecked ? `checked` : ``}>
  <label for="statistic-${id}" class="statistic__filters-label">${filter}</label>`);
};

const createStatisticRankMarkup = ({rank, avatar}) => {
  const profileRating = capitalizeFirstLetters(rank).join(` `);
  return (`<img class="statistic__img" src="images/${avatar}" alt="Avatar" width="35" height="35">
  <span class="statistic__rank-label">${profileRating}</span>`);
};
const createStatisticTextListMarkup = (profile, title) => {
  switch (title) {
    case `You watched`:
      const {moviesWatched} = profile;
      return `<li class="statistic__text-item">
      <h4 class="statistic__item-title">${title}</h4>
      <p class="statistic__item-text">${moviesWatched} <span class="statistic__item-description">movies</span></p>
    </li>`;
    case `Total duration`:
      const {timeSpent} = profile;
      const totalDuration = transformDuration(timeSpent);
      const [hours, minutes] = totalDuration;
      return `<li class="statistic__text-item">
      <h4 class="statistic__item-title">${title}</h4>
      <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
    </li>`;
    case `Top genre`:
      const {topGenre} = profile;
      return `<li class="statistic__text-item">
      <h4 class="statistic__item-title">${title}</h4>
      <p class="statistic__item-text">${topGenre}</p>
    </li>`;
  }
  return ``;
};

export const createStatisticsTemplate = (profile) => {
  const filtersMarkup = filterNames.map((filter, i) => {
    return createFiltersMarkup(filter, i === 0);
  }).join(`\n`);
  const rankMarkup = createStatisticRankMarkup(profile);
  const statisticListTextMarkup = statisticItemsTitle.map((title) => {
    return createStatisticTextListMarkup(profile, title);
  }).join(`\n`);
  return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      ${rankMarkup}
    </p>
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filtersMarkup}
    </form>
    <ul class="statistic__text-list">
    ${statisticListTextMarkup}
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`);
};
