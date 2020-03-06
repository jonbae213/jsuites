
import { RECEIVE_DEPARTMENT_EVENTS} from '../../actions/department_actions';
import {DELETE_EVENT, RECEIVE_EVENT} from '../../actions/event_actions'
  
  export default (state = [], action) => {
    Object.freeze(state);
  
    switch (action.type) {
      case RECEIVE_DEPARTMENT_EVENTS:
        
        return action.events
      case RECEIVE_EVENT:
        let modifiedState = state.slice()
        if (!modifiedState.includes(action.event.data._id)){
          modifiedState.push(action.event.data._id);
        }
        return modifiedState
      case DELETE_EVENT:
          let newState = state.filter( eventId => eventId !== action.eventId.data.eventId)
          return newState
      default:
        return state;
    }
  }