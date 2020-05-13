import {capitalizeFirstLetters, formatTime, getGenres} from "../utils/common.js";
import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const filterNames = [
  `All time`, `Today`, `Week`, `Month`, `Year`
];

const StatisticTitle = {
  WATCHED: `You watched`,
  DURATION: `Total duration`,
  TOP_GENRE: `Top genre`,
};

const getUniqueGenres = (genres) => {
  const uniqueGenres = Array.from(new Set(genres));
  const uniqueGenresMovieQty = uniqueGenres.map((genre) => {
    let qty = 0;
    genres.forEach((it) => {
      if (it === genre) {
        qty++;
      }
    });
    return {
      name: genre,
      qty
    };
  });
  const sortedUniqueGenres = uniqueGenresMovieQty.sort((a, b) => b.qty - a.qty);
  return sortedUniqueGenres;
};


const createFiltersMarkup = (filter, isChecked) => {
  const id = filter.toLowerCase().split(` `).join(`-`);

  return (`<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${id}" value="${id}" ${isChecked ? `checked` : ``}>
  <label for="statistic-${id}" class="statistic__filters-label">${filter}</label>`);
};

const createStatisticRankMarkup = (rank, avatar) => {
  const profileRating = capitalizeFirstLetters(rank).join(` `);
  return (`<img class="statistic__img" src="images/${avatar}" alt="Avatar" width="35" height="35">
  <span class="statistic__rank-label">${profileRating}</span>`);
};

const createWatchedMoviesMarkup = (watchedMoviesCount, title) => {
  return (`<li class="statistic__text-item">
  <h4 class="statistic__item-title">${title}</h4>
  <p class="statistic__item-text">${watchedMoviesCount} <span class="statistic__item-description">movies</span></p>
</li>`);
};

const createDurationMarkup = (timeSpent, title) => {
  const formattedDuration = formatTime(timeSpent);
  const hours = formattedDuration.split(` `)[0];
  const minutes = formattedDuration.split(` `)[1];

  return (`<li class="statistic__text-item">
  <h4 class="statistic__item-title">${title}</h4>
  <p class="statistic__item-text">${hours}<span class="statistic__item-description">h</span>${minutes}<span class="statistic__item-description">m</span></p>
</li>`);
};

const createTopGenreMarkup = (topGenre, title) => {
  return (`<li class="statistic__text-item">
  <h4 class="statistic__item-title">${title}</h4>
  <p class="statistic__item-text">${topGenre}</p>
</li>`);
};


const renderChart = (statCtx, genres) => {
  const BAR_HEIGHT = 50;

  const genreNames = genres.map((genre) => genre.name);
  const genreMovieQty = genres.map((genre) => genre.qty);
  const genresCount = genres.length;

  statCtx.height = BAR_HEIGHT * genresCount;

  return new Chart(statCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genreNames,
      datasets: [{
        data: genreMovieQty,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export const createStatisticsTemplate = ({rank, avatar, timeSpent, topGenre, watchedMoviesCount}) => {
  const filtersMarkup = filterNames.map((filter, i) => {
    return createFiltersMarkup(filter, i === 0);
  }).join(`\n`);

  const rankMarkup = createStatisticRankMarkup(rank, avatar);
  const watchedMoviesMarkup = createWatchedMoviesMarkup(watchedMoviesCount, StatisticTitle.WATCHED);
  const durationMarkup = createDurationMarkup(timeSpent, StatisticTitle.DURATION);
  const topGenreMarkup = createTopGenreMarkup(topGenre, StatisticTitle.TOP_GENRE);


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
      ${watchedMoviesMarkup}
      ${durationMarkup}
      ${topGenreMarkup}
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`);
};
export default class Statistic extends AbstractSmartComponent {
  constructor(userModel, moviesModel) {
    super();
    this._userModel = userModel;
    this._moviesModel = moviesModel;

    this._statChart = null;


    this._renderChart();
  }

  getTemplate() {
    const userProfile = this._userModel.getUser();
    return createStatisticsTemplate(userProfile);
  }

  recoveryListeners() {

  }

  rerender(userModel, moviesModel) {
    this._userModel = userModel;
    this._moviesModel = moviesModel;

    super.rerender();
    this._renderChart();

  }

  show() {
    super.show();

    this.rerender(this._userModel, this._moviesModel);
  }

  _renderChart() {
    const element = this.getElement();
    const statCtx = element.querySelector(`.statistic__chart`);

    const watchedMovies = this._moviesModel.getWatchedMovies();
    const genres = getGenres(watchedMovies);
    const uniqueGenres = getUniqueGenres(genres);

    this._statChart = renderChart(statCtx, uniqueGenres);
  }

}
