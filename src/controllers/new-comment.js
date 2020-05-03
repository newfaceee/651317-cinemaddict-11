import NewCommentComponent from '../components/film-details-new-comment.js';
import {render, replace, RenderPosition} from '../utils/render.js';
export default class NewCommentController {
  constructor(container, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;

    this._newCommentComponent = null;

  }

  render() {
    const container = this._container;
    
    const oldComponent = this._newCommentComponent;
    this._newCommentComponent = new NewCommentComponent();
    render(container, this._newCommentComponent, RenderPosition.BEFOREEND);
  }
}