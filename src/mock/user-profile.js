import {getRandomNumber, getGenres} from "../utils.js";
import {genres} from "../data/genres.js";
const generateProfileRank = (watchedMoviesCount) => {
  if (watchedMoviesCount <= 10 && watchedMoviesCount >= 1) {
    return `novice`;
  } else if (watchedMoviesCount <= 20 && watchedMoviesCount >= 11) {
    return `fan`;
  } else if (watchedMoviesCount >= 21) {
    return `movie buff`;
  }
  return ``;
};

const generateUserProfile = () => {
  const watchedMoviesCount = getRandomNumber(0, 30);

  return {
    avatar: `bitmap@2x.png`,
    moviesWatched: watchedMoviesCount,
    rank: generateProfileRank(watchedMoviesCount),
    timeSpent: getRandomNumber(60, 600),
    topGenre: getGenres(genres)[0],
  };
};

export {generateUserProfile};
