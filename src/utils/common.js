import moment from 'moment';

export const capitalizeFirstLetters = (string) => {
  const words = string.trim().split(` `);
  return words.map((word) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
  });
};

export const getGenres = (watchedMovies) => {
  return [].concat(...watchedMovies.map((movie) => {
    return movie.genre;
  }));
};

export const formatTime = (duration) => {
  return moment.utc(moment.duration(duration, `minutes`).asMilliseconds()).format(`h m`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (date) => {
  return moment(date).format(`YYYY/MM/DD/ hh:mm`);
};
