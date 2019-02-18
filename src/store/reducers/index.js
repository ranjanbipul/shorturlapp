import { combineReducers } from "redux";
import redirects from "./redirects";
import app from "./app";

export default combineReducers({ app,redirects });
