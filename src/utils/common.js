import {COMMENTS_EMOJIS, COMMENTS} from "../const.js";

export const transformDuration = (minutes) => {
  const MINUTES_IN_HOUR = 60;
  const h = Math.floor(minutes / MINUTES_IN_HOUR);
  const m = minutes - MINUTES_IN_HOUR * h;
  return [h, m];
};

export const capitalizeFirstLetters = (string) => {
  const words = string.trim().split(` `);
  return words.map((word) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
  });
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const getRandomData = (dataItem) => {
  return dataItem[getRandomNumber(0, dataItem.length - 1)];
};
export const getRandomDate = () => {
  const YEAR_MIN = 1998;
  const YEAR_MAX = 2020;
  const MONTH_MIN = 1;
  const MONTH_MAX = 12;
  const DAY_MIN = 1;
  const DAY_MAX = 28;
  const generatedYear = getRandomNumber(YEAR_MIN, YEAR_MAX);
  const generatedMonth = getRandomNumber(MONTH_MIN, MONTH_MAX);
  const generatedDay = getRandomNumber(DAY_MIN, DAY_MAX);
  return new Date(generatedYear, generatedMonth, generatedDay);
};
export const getRating = (min, max) => {
  return (Math.random() * (max - min + 1) + min).toFixed(1);
};

export const getRandomDataFromRange = (dataItem, minValue = 1, maxValue = 4) => {
  const rangeSize = getRandomNumber(minValue, maxValue);
  return new Array(rangeSize).fill(``).map(() => {
    return dataItem[getRandomNumber(0, dataItem.length - 1)];
  });
};
export const getFilmOverview = () => {
  const OVERVIEW_SIZE_MIN = 1;
  const OVERVIEW_SIZE_MAX = 5;
  let overview = ``;
  const overviewTemplates = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];
  const overviewSize = getRandomNumber(OVERVIEW_SIZE_MIN, OVERVIEW_SIZE_MAX);
  for (let i = 0; i < overviewSize; i++) {
    overview +=
      overviewTemplates[getRandomNumber(0, overviewTemplates.length - 1)];
  }
  return overview;
};
const createComment = () => {
  return {
    text: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)],
    emoji: COMMENTS_EMOJIS[getRandomNumber(0, COMMENTS_EMOJIS.length - 1)],
    author: `John Doe`,
    date: `2019/12/31/ 23:59`,
  };
};
export const getComments = () => {
  const COMMENTS_MIN = 0;
  const COMMENTS_MAX = 5;
  const commentsNumber = getRandomNumber(COMMENTS_MIN, COMMENTS_MAX);
  return new Array(commentsNumber).fill(``).map(createComment);
};
