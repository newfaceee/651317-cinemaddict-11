
export default class Movies {
	constructor() {
		this._movies = [];

		this._dataChangeHandlers = [];
	}

	getMovies() {
		return this._movies;
	}

	setMovies(movies) {
		this._movies = Array.from(movies);
		this._callHandlers(this._dataChangeHandlers);
	}

	updateMovie(id, movie) {
		const index = this._movies.findIndex((movie) => movie.id === id);

		if (index === -1) {
			return false;
		}

		this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
	}
}