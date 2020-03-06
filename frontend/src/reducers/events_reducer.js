import {
  RECEIVE_ALL_EVENTS,
  RECEIVE_EVENT,
} from '../actions/event_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_EVENT:
      return Object.assign({}, state, { [action.event.data._id]: action.event.data});
    case RECEIVE_ALL_EVENTS:
      let events = {};
      action.events.data.forEach(event => {
        events[event._id] = event
      });
      return events;
    default:
      return state;
  }
}