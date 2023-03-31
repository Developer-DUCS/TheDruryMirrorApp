//-----------------------------------------------------//
// 
// Store.js
// - Utilizes redux to enable global variables for this Next/React project
// - The 'store' basically stores these variables and applies them to the project
//   - Located on the src of the project so it can do that
// 
// Created by Thomas O'Brien on March 31
// 
//-----------------------------------------------------//

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;
