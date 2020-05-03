import {COMMENTS, EMOJIS} from '../const.js';
import {getRandomNumber} from '../utils/common.js';

export const generateComment = (id) =>{
  return {
    id,
    text: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)],
    emoji: EMOJIS[getRandomNumber(0, EMOJIS.length - 1)],
    author: `John Doe`,
    date: `2019/12/31/ 23:59`,
    commentId: String(Math.random()).split(`.`)[1],
  };
};

export const generateComments = (filmCards) => {
  let comments = [];
  const COMMENT_COUNT_MAX = 5;

  for (let i = 0; i < filmCards.length; i++) {
    const commentsCount = getRandomNumber(0, COMMENT_COUNT_MAX);
    const comment = new Array(commentsCount).fill(``).map(() => {
      return generateComment(filmCards[i].id);
    });
    comments.push(comment);
  }

  return comments;
};

