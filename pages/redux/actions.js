// redux/actions.js
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';

export const setCurrentArticle = (slug) => ({
  type: SET_CURRENT_ARTICLE,
  payload: slug,
});
