import {getRandomNumber, getFilmOverview, getComments, getRating, getRandomData, getRandomDataFromRange} from '../utils/common.js';
import {actors} from '../data/actors.js';
import {writers} from '../data/writers.js';
import {countrys} from '../data/countrys.js';
import {genres} from '../data/genres.js';
import {directors} from '../data/directors.js';
import {originalTitles} from '../data/original-titles.js';
import {titles} from '../data/titles';

const isAdult = Math.random() >= 0.5 ? true : false;

const generateFilmCard = () => {
  return {
    title: getRandomData(titles),
    originalTitle: getRandomData(originalTitles),
    poster: getRandomData(titles),
    overview: getFilmOverview(),
    rating: getRating(1.0, 10.0),
    releaseDate: new Date(),
    duration: getRandomNumber(60, 180),
    genres: getRandomDataFromRange(genres),
    comments: getComments(),
    director: getRandomData(directors),
    writers: getRandomDataFromRange(writers),
    actors: getRandomDataFromRange(actors),
    country: getRandomData(countrys),
    adult: isAdult,
  };
};
const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};
export {generateFilmCard, generateFilmCards};
