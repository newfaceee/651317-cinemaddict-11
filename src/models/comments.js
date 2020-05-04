

export default class Comments {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = [];
    this._activeEmotion = null;
  }

  getComments() {
    return this._comments;
  }

  getCommentsByFilmId(id) {
    const index = this._comments.findIndex((comments) => comments.id === id);
    return this._comments[index];
  }

  getActiveEmotion() {
    return this._activeEmotion;
  }

  setComments(comments) {
    this._comments = comments;
  }

  setActiveEmotion(emotion) {
    this._activeEmoji = emotion;
  }

  deleteComment(oldData, clickedCommentId) {
    const index = this._comments.findIndex((comment) => {
      return comment.id === oldData.id;
    });
    if (index === -1) {
      return false;
    }
    oldData.comments = oldData.comments.filter((comment) => comment.commentId !== clickedCommentId);
    this._comments = [].concat(this._comments.slice(0, index), oldData, this._comments.slice(index + 1));
    return true;
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}