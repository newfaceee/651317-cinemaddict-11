export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data.film_info[`title`];
    this.originalTitle = data.film_info[`alternative_title`];
    this.poster = data.film_info[`poster`];
    this.description = data.film_info[`description`];
    this.rating = data.film_info[`total_rating`];
    this.releaseData = new Date(data.film_info.release[`date`]);
    this.duration = data.film_info[`runtime`];
    this.genre = data.film_info[`genre`];
    this.director = data.film_info[`director`];
    this.writers = data.film_info[`writers`];
    this.actors = data.film_info[`actors`];
    this.country = data.film_info.release[`release_country`];
    this.ageRating = data.film_info[`age_rating`];
    this.watchlist = Boolean(data.user_details[`watchlist`]);
    this.alreadyWatched = Boolean(data.user_details[`already_watched`]);
    this.favorite = Boolean(data.user_details[`favorite`]);
    this.comments = data[`comments`];
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }
}

