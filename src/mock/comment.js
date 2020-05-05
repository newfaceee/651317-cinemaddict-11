import {COMMENTS, EMOJIS} from '../const.js';
import {getRandomNumber} from '../utils/common.js';

export const generateComment = () =>{
  return {
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
    let commentsData = [];
    const commentsCount = getRandomNumber(0, COMMENT_COUNT_MAX);
    for (let j = 0; j < commentsCount; j++) {
      commentsData.push(generateComment());
    }
    const comment = {
      id: filmCards[i].id,
      comments: commentsData,
    };
    comments.push(comment);
  }
  return comments;
};
