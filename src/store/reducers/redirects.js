import { ADD_REDIRECT, UPDATE_REDIRECTS, LOGOUT } from "../actionTypes";
import {arrayToObject} from "../../lib/utility";

const initialState = {
  allIds: [],
  byIds: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_REDIRECT: {
      const { redirect } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, redirect._id],
        byIds: {
          ...state.byIds,
          [redirect._id]: redirect
        }
      };
    }
    case UPDATE_REDIRECTS: {
      const { redirects } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, ...redirects.map((x)=>x._id)],
        byIds: {
          ...state.byIds,
          ...arrayToObject(redirects,"_id")
        }
      };
    }
    case LOGOUT: {
      return {
        allIds: [],
        byIds: {}
      };
    }
    default:
      return state;
  }
}
