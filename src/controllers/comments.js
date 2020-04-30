import FilmDetailsPopupCommentsComponent from '../components/film-details-popup-comments.js';
import {getRandomNumber, getComments} from '../utils/common.js';


export default class CommentsController {
  constructor(container, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;
    console.log(this._commentsModel);
  }

  render(comments) {
    const filmDetailsPopupCommentsComponent = new FilmDetailsPopupCommentsComponent(comments);
    console.log(filmDetailsPopupCommentsComponent);
  }
}