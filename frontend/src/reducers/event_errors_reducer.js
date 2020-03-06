import { RECEIVE_EVENT_ERRORS, RECEIVE_EVENT } from '../actions/event_actions';

const EventErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_EVENT:
      return [];
    default:
      return state;
  }
};

export default EventErrorsReducer;

