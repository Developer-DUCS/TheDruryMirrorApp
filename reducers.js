//-----------------------------------------------------//
// 
// Reducers.js
// - Initializes the global variables and helps the store with listeners
// 
// Created by Thomas O'Brien on March 31
// 
//-----------------------------------------------------//

import { combineReducers } from "redux";

// Set the initial article feed to show all articles
// Set currentArticle to NaN since article feed is loaded first
const initialState = {
  currentPage: "All",
  currentArticle: "NaN"
};

// Sets the article feed to whatever SET_CURRENT_PAGE is set to in NavBar.js (ie National)
function articleReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_ARTICLE_DATA":
      console.log("Setting Article Data: ", action.payload)
      return { ...state, currentArticle: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  article: articleReducer,
});

export default rootReducer;
