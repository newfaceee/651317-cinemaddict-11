import { getRandomNumber, getFilmOverview, getTitle, getOriginalTitle, getComments, getDirector, getWriters, getActors, getCountry, getPoster, getGenres, getRating } from '../utils.js';
import { actors } from '../data/actors.js';
import { writers } from '../data/writers.js';
import { countrys } from '../data/countrys.js';
import { genres } from '../data/genres.js';
import { directors } from '../data/directors.js';
import { originalTitles } from '../data/original-titles.js';
import { titles } from '../data/titles';

const isAdult = Math.random() >= 0.5 ? true : false;

const generateFilmCard = () => {
    return {
        title: getTitle(titles),
        original_title: getOriginalTitle(originalTitles),
        poster: getPoster(titles),
        overview: getFilmOverview(),
        rating: getRating(1.0, 10.0),
        release_date: new Date(),
        duration: getRandomNumber(60, 180),
        genres: getGenres(genres),
        comments: getComments(),
        director: getDirector(directors),
        writers: getWriters(writers),
        actors: getActors(actors),
        country: getCountry(countrys),
        adult: isAdult,
    }
}
const generateFilmCards = (count) => {
    return new Array(count).fill(``).map(generateFilmCard);
}
export { generateFilmCard, generateFilmCards }
