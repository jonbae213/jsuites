import { combineReducers } from 'redux';
import eventsReducer from './events_reducer';
import usersReducer from './users_reducer';
import departmentsReducer from './departments_reducer';

export default combineReducers({
  events: eventsReducer,
  users: usersReducer,
  departments: departmentsReducer
})
