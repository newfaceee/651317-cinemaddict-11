

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

  deleteComment(oldData, clickedCommentId) {
    
    const index = this._comments.findIndex((comment) => {
      return comment.id === oldData.id;
    });
    if (index === -1) {
      return;
    }
    console.log(`da`);
    oldData.comments = oldData.comments.filter((comment) => comment.commentId !== clickedCommentId);
    this._comments = [].concat(this._comments.slice(0, index), oldData, this._comments.slice(index + 1));
    
    this._callHandlers(this._dataChangeHandlers);

  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}