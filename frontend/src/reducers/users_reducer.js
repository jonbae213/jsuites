import {
  RECEIVE_USER,
  RECEIVE_ALL_USERS
} from '../actions/user_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_USERS:
      let users = {};
      action.users.data.forEach(user => {
        users[user._id] = user 
      });
      return users;  
    case RECEIVE_USER:
      return Object.assign({}, state, {[action.user.data._id]: action.user.data});
    default:
      return state;
  }
}