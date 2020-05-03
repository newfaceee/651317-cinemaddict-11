

export default class Comments {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = comments;
  }

  deleteComment(oldData, id) {

    // const commentIndex = oldData.findIndex((it) => it.commentId === id);
    // if (commentIndex === -1) {
    //   return;
    // }

    // console.log(this._comments.slice(commentsIndex));

  }

  setDataChangeHandlers() {

  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}