import {getRandomNumber, getFilmOverview, getComments, getRating, getRandomData, getRandomDataFromRange, getRandomDate, getRandomBoolean} from '../utils/common.js';
import {actors} from '../data/actors.js';
import {writers} from '../data/writers.js';
import {countrys} from '../data/countrys.js';
import {genres} from '../data/genres.js';
import {directors} from '../data/directors.js';
import {originalTitles} from '../data/original-titles.js';
import {titles} from '../data/titles';

const generateFilmCard = () => {
  return {
    id: String(Math.random()).split(`.`)[1],
    title: getRandomData(titles),
    originalTitle: getRandomData(originalTitles),
    poster: getRandomData(titles),
    overview: getFilmOverview(),
    rating: getRating(1.0, 10.0),
    releaseDate: getRandomDate(),
    duration: getRandomNumber(60, 180),
    genres: getRandomDataFromRange(genres),
    director: getRandomData(directors),
    writers: getRandomDataFromRange(writers),
    actors: getRandomDataFromRange(actors),
    country: getRandomData(countrys),
    adult: getRandomBoolean(),
    isWatchList: getRandomBoolean(),
    isAlreadyWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    controls: {
        isWatchList: getRandomBoolean(),
        isAlreadyWatched: getRandomBoolean(),
        isFavorite: getRandomBoolean(),
    },
  };
};
const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};
export {generateFilmCard, generateFilmCards};
