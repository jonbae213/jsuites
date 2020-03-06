import { 
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER 
} from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  user: undefined
};

export default function(state = initialState, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER_LOGOUT:
      
    return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_CURRENT_USER:
      return {
        isAuthenticated: !!action.user,
        user: action.user
      }
    default: 
      return state;
  }
}
