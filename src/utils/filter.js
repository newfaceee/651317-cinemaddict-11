import {FilterType} from '../const.js';

export const getAllMovies = (movies) => {
  return movies;
};

export const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.watchlist);
};

export const getHistoryMovies = (movies) => {
  return movies.filter((movie) => movie.alreadyWatched);
};

export const getFavoritesMovies = (movies) => {
  return movies.filter((movie) => movie.favorite);
};

export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return getAllMovies(movies);
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getHistoryMovies(movies);
    case FilterType.FAVORITES:
      return getFavoritesMovies(movies);
  }
  return movies;
};
