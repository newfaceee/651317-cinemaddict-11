import {getGenres} from '../utils/common.js';
const generateProfileRank = (watchedMoviesCount) => {
  const NOVICE_MIN = 1;
  const NOVICE_MAX = 10;
  const FAN_MIN = 11;
  const FAN_MAX = 20;
  const MOVIE_BUFF = 21;
  let rank;

  if (watchedMoviesCount >= NOVICE_MIN && watchedMoviesCount <= NOVICE_MAX) {
    rank = `novice`;
  } else if (watchedMoviesCount >= FAN_MIN && watchedMoviesCount <= FAN_MAX) {
    rank = `fan`;
  } else if (watchedMoviesCount >= MOVIE_BUFF) {
    rank = `movie buff`;
  } else if (watchedMoviesCount === 0) {
    rank = ``;
  }
  return rank;
};

const getTopGenre = (genres) => {
  const uniqueGenres = Array.from(new Set(genres));
  if (uniqueGenres.length > 0) {
    return uniqueGenres[0];
  }
  if (uniqueGenres.length === 0) {
    return ``;
  }
  const uniqueGenresQty = uniqueGenres.map((genre) => {
    let qty = 0;
    genres.forEach((it) => {
      if (it === genre) {
        qty++;
      }
    });
    return qty;
  });
  const topGenreQty = Math.max(...uniqueGenresQty);
  const topGenreIndex = uniqueGenresQty.indexOf(topGenreQty);
  const topGenre = uniqueGenres[topGenreIndex];
  return topGenre;
};

const getTimeSpent = (watchedMovies) => {
  let timeSpent = 0;
  watchedMovies.forEach((movie) => {
    timeSpent += movie.duration;
  });
  return timeSpent;
};

const generateUserProfile = (watchedMovies) => {
  const watchedMoviesCount = watchedMovies.length;
  const genres = getGenres(watchedMovies);
  const topGenre = getTopGenre(genres);
  const rank = generateProfileRank(watchedMoviesCount);
  const timeSpent = getTimeSpent(watchedMovies);
  return {
    avatar: `bitmap@2x.png`,
    watchedMoviesCount,
    timeSpent,
    rank,
    topGenre,
  };
};

export {generateUserProfile};
