import { 
  LOGIN,
  LOGOUT,
  ADD_REDIRECT,
  UPDATE_REDIRECTS
} from "./actionTypes";
import Api from "../lib/api";

export const logout = () => ({
  type: LOGOUT,
  payload: {}
});

export const addRedirect = redirect => ({
  type: ADD_REDIRECT,
  payload: {
    redirect
  }
});

export const updateRedirects = redirects => ({
  type: UPDATE_REDIRECTS,
  payload: {redirects}
});

export const newRedirect = (url) => {
  return(dispatch,getState) => {
    return Api.post("/redirects",{url}).then(json=>{
      dispatch(addRedirect(json));
      return json;
    });
  }
}

export const fetchRedirectList = () => {
  return(dispatch,getState) => {
    return Api.get("/redirects").then(json=>{
      dispatch(updateRedirects(json));
      return json;
    });
  }
}

export const doLogin = (username,password) => {
  return(dispatch,getState) => {
    return Api.post("/account/auth",{username,password}).then(data=>{
      dispatch({type: LOGIN, payload:{token: data.token,user:data.user}});
      return data;
    });
  }
}

export const register = (name,username,password) => {
  return(dispatch,getState) => {
    return Api.post("/account/register",{name,username,password}).then(data=>{
      return data;
    });
  }
}
