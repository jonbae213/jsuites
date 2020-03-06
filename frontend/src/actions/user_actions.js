import * as UserUtil from '../util/user_util';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveAllUsers = users => ({
  type: RECEIVE_ALL_USERS,
  users
});

export const getAllUsers = () => dispatch => {
  return UserUtil.fetchAllUsers()
    .then(users => {
      dispatch(receiveAllUsers(users))
    });
};

export const getUser = userId => dispatch => {
  return UserUtil.fetchUser(userId)
    .then(user => {
      dispatch(receiveUser(user))
    });
};