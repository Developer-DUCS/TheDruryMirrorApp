// redux/actions.js
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
export const SET_ARTICLE_DATA = 'SET_ARTICLE_DATA';

export const setCurrentArticle = (slug) => ({
  type: SET_CURRENT_ARTICLE,
  payload: slug,
});

export const setArticleData = (articleData) = ({
  type: SET_ARTICLE_DATA,
  payload: articleData
})
