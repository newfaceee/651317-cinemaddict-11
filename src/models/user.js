import {generateUserProfile} from '../mock/user-profile.js';

export default class User {
  constructor() {
    this._user = null;

    this._dataChangeHandlers = [];
  }

  setUser(user) {
    this._user = user;
  }

  updateUser(watchedMovies) {
    const newUser = generateUserProfile(watchedMovies);
    this._user = newUser;
  }

  getUser() {
    return this._user;
  }
}
