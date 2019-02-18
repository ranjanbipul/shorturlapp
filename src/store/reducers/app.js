import { LOGIN,LOGOUT,SET_TRANSFER_STATE } from "../actionTypes";

const initialState = {
  token: null,
  user: null,
  transfer: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSFER_STATE: {
      return {
        ...state,
        transfer: action.state
      };
    }
    case LOGIN: {
        const {user,token} = action.payload;
        return {
            ...state,
            user,
            token
        };
    }
    case LOGOUT: {
        return {
            ...state,
            user: null,
            token: null
        };
    }
    default:
      return state;
  }
}
