import { combineReducers } from 'redux';
import errorsReducer from '../errors/errors_reducer';
import modalReducer from './modal_reducer';
import sidebarReducer from './sidebar_reducer';
import departmentEventsReducer from './department_events_reducer';

const uiReducer = combineReducers({
  errors: errorsReducer,
  modal: modalReducer,
  departmentEvents: departmentEventsReducer,
  sidebar: sidebarReducer
})

export default uiReducer;