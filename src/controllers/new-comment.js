import NewCommentComponent from '../components/film-details-new-comment.js';
import {EMOJIS} from '../const.js';
import {render, replace, RenderPosition, remove} from '../utils/render.js';

export default class NewCommentController {
  constructor(container, commentsModel, onEmotionChange, activeEmotion) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._activeEmotion = activeEmotion;

    this._newCommentComponent = null;

    this._onEmotionChange = onEmotionChange;
    this._onDataChange = this._onDataChange.bind(this);

  }

  render() {

    const container = this._container;
    const emojis = EMOJIS.map((emoji) => {
      return {
        name: emoji,
        active: this._activeEmotion === emoji,
      };
    });

    const oldComponent = this._newCommentComponent;
    this._newCommentComponent = new NewCommentComponent(emojis);
    this._newCommentComponent.setEmojiChangeHandler((emotion) => {
      this._onEmotionChange(emotion);
    });

    if (oldComponent) {
      replace(oldComponent, this._newCommentComponent);
    } else {
      render(container, this._newCommentComponent, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    remove(this._newCommentComponent);
  }

  _onDataChange() {
    this.render();
  }
}