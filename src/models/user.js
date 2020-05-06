export default class User {
  constructor() {
    this._user = null;

    this._dataChangeHandlers = [];
  }

  setUser(user) {
    this._user = user;
  }

  getUser() {
    return this._user;
  }
}
