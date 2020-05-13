import NewCommentComponent from '../components/film-details-new-comment.js';
import CommentAddEmotionLabelComponent from '../components/comment-add-emoji-label.js';
import {EMOJIS} from '../const.js';
import {render, RenderPosition, remove} from '../utils/render.js';

export default class NewCommentController {
  constructor(container, commentsModel, activeEmotion, onAddComment, comments) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._activeEmotion = activeEmotion;
    this._comments = comments;

    this._newCommentComponent = null;
    this._commentAddEmotionLabelComponent = null;

    this._onAddComment = onAddComment;

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

    this._newCommentComponent = new NewCommentComponent(emojis);
    this._commentAddEmotionLabelComponent = new CommentAddEmotionLabelComponent(this._activeEmotion);
    const newCommentElement = this._newCommentComponent.getElement();
    render(newCommentElement, this._commentAddEmotionLabelComponent, RenderPosition.AFTERBEGIN);

    this._newCommentComponent.setEmojiChangeHandler((emotion) => {
      this._onEmotionChange(emotion);
    });
    this._newCommentComponent.setSubmitFormHandler((emotion, commentValue) => {
      const comment = {
        "comment": commentValue,
        "date": new Date().toISOString(),
        "emotion": emotion
      };
      this._onAddComment(comment);
    });

    render(container, this._newCommentComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._newCommentComponent);
  }

  _onDataChange() {
    this.render();
  }

  _onEmotionChange(emotion) {
    const newCommentElement = this._newCommentComponent.getElement();
    this._commentAddEmotionLabelComponent.getElement().remove();
    this._commentAddEmotionLabelComponent = null;
    this._commentAddEmotionLabelComponent = new CommentAddEmotionLabelComponent(emotion);
    render(newCommentElement, this._commentAddEmotionLabelComponent, RenderPosition.AFTERBEGIN);
  }
}
