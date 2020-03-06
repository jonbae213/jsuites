import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import uiReducer from './ui/ui_reducer';
import entitiesReducer from './entities_reducer';

const RootReducer = combineReducers({
  session: sessionReducer,
  ui: uiReducer,
  entities: entitiesReducer
});

export default RootReducer;