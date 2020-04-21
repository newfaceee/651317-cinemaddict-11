import {getRandomNumber, getRandomDataFromRange} from "../utils/common.js";
import {genres} from "../data/genres.js";
const generateProfileRank = (watchedMoviesCount) => {
  const NOVICE_MIN = 1;
  const NOVICE_MAX = 10;
  const FAN_MIN = 11;
  const FAN_MAX = 20;
  const MOVIE_BUFF = 21;

  if (watchedMoviesCount >= NOVICE_MIN && watchedMoviesCount <= NOVICE_MAX) {
    return `novice`;
  } else if (watchedMoviesCount >= FAN_MIN && watchedMoviesCount <= FAN_MAX) {
    return `fan`;
  } else if (watchedMoviesCount >= MOVIE_BUFF) {
    return `movie buff`;
  }
  return ``;
};

const generateUserProfile = () => {
  const WATCHED_MOVIES_COUNT_MIN = 0;
  const WATCHED_MOVIED_COUNT_MAX = 30;
  const TIME_SPENT_MIN = 60;
  const TIME_SPENT_MAX = 600;

  const watchedMoviesCount = getRandomNumber(WATCHED_MOVIES_COUNT_MIN, WATCHED_MOVIED_COUNT_MAX);

  return {
    avatar: `bitmap@2x.png`,
    moviesWatched: watchedMoviesCount,
    rank: generateProfileRank(watchedMoviesCount),
    timeSpent: getRandomNumber(TIME_SPENT_MIN, TIME_SPENT_MAX),
    topGenre: getRandomDataFromRange(genres)[0],
  };
};

export {generateUserProfile};
