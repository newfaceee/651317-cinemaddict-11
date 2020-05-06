import {capitalizeFirstLetters, transformDuration} from "../utils/common.js";
import AbstractComponent from './abstract-component.js';
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
  const totalDuration = transformDuration(timeSpent);
  const [hours, minutes] = totalDuration;
  return (`<li class="statistic__text-item">
  <h4 class="statistic__item-title">${title}</h4>
  <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
</li>`);
};

const createTopGenreMarkup = (topGenre, title) => {
  return (`<li class="statistic__text-item">
  <h4 class="statistic__item-title">${title}</h4>
  <p class="statistic__item-text">${topGenre}</p>
</li>`);
};


const BAR_HEIGHT = 50;
const statisticCtx = document.querySelector(`.statistic__chart`);

// Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
statisticCtx.height = BAR_HEIGHT * 5;

const myChart = new Chart(statisticCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
    datasets: [{
      data: [11, 8, 7, 4, 3],
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
        anchor: 'start',
        align: 'start',
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
export default class Statistic extends AbstractComponent {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  getTemplate() {
    return createStatisticsTemplate(this._profile);
  }
}
