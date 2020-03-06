import * as SessionAPIUtil from '../util/session_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
}); 

export const receiveCurrentUser = currentUser => {
  return({
    type: RECEIVE_CURRENT_USER,
    user: currentUser
  })
};

export const login = user => dispatch => {
  SessionAPIUtil.login(user).then(res => {
    
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    SessionAPIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded));
  })

  .catch(err => {
    dispatch(receiveErrors(err.response.data));
  })
}

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  SessionAPIUtil.setAuthToken(false)
  dispatch(logoutUser());
};

