import {COMMENTS_EMOJIS, COMMENTS} from './const.js';

export const transformDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes - (60 * h);
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
export const getRating = (min, max) => {
  return (Math.random() * (max - min + 1) + min).toFixed(1);
};
export const getTitle = (titles) => {
  return titles[getRandomNumber(0, titles.length - 1)];
};

export const getOriginalTitle = (originalTitles) => {
  return originalTitles[getRandomNumber(0, originalTitles.length - 1)];
};

export const getPoster = (titles) => {
  return `${titles[getRandomNumber(0, titles.length - 1)].toLowerCase().split(` `).join(`-`)}.jpg`;
};
export const getGenres = (genres) => {
  const genresQty = getRandomNumber(1, 3);
  return new Array(genresQty).fill(``).map(() => {
    return genres[getRandomNumber(0, genres.length - 1)];
  });
};
export const getDirector = (directors) => {
  return directors[getRandomNumber(0, directors.length - 1)];
};
export const getWriters = (writers) => {
  const writersQty = getRandomNumber(1, 3);
  return new Array(writersQty).fill(``).map(() => {
    return writers[getRandomNumber(0, writers.length - 1)];
  });
};
export const getActors = (actors) => {
  const actorsQty = getRandomNumber(1, 4);
  return new Array(actorsQty).fill(``).map(() => {
    return actors[getRandomNumber(0, actors.length - 1)];
  });
};
export const getCountry = (countrys) => {
  return countrys[getRandomNumber(0, countrys.length - 1)];
};
export const getFilmOverview = () => {
  let overview = ``;
  const overviewTemplates = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
  const overviewSize = getRandomNumber(1, 5);
  for (let i = 0; i < overviewSize; i++) {
    overview += overviewTemplates[getRandomNumber(0, overviewTemplates.length - 1)];
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
  const commentsNumber = getRandomNumber(0, 5);
  return new Array(commentsNumber).fill(``).map(createComment);
};

