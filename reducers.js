//-----------------------------------------------------//
// 
// Reducers.js
// - Initializes the global variables and helps the store with listeners
// 
// Created by Thomas O'Brien on March 31
// 
//-----------------------------------------------------//

import { combineReducers } from "redux";

const initialState = {
  currentPage: "All",
};

function articleReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  article: articleReducer,
});

export default rootReducer;
