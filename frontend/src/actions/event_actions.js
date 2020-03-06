import * as EventUtil from '../util/event_util';

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";
export const DELETE_EVENT = 'DELETE_EVENT'

export const receiveAllEvents = events => ({
  type: RECEIVE_ALL_EVENTS,
  events
});

export const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

export const receiveEventErrors = errors => ({
  type: RECEIVE_EVENT_ERRORS,
  errors
});

export const removeEvent = eventId => ({
  type: DELETE_EVENT,
  eventId
})

export const fetchAllEvents = () => dispatch => {
  return EventUtil.fetchAllEvents()
    .then(events => {
    dispatch(receiveAllEvents(events));
  });
};

export const updateEvent = event => dispatch => {
  return EventUtil.patchEvent(event)
    .then(event => {
      dispatch(receiveEvent(event));
    }, (errors) => {
      dispatch(receiveEventErrors(errors))
  });
};

export const deleteEvent = event => dispatch => {
  return EventUtil.deleteEvent(event)
    .then((eventId) => dispatch(removeEvent(eventId)));
};

export const createEvent = event => dispatch => {
  return EventUtil.postEvent(event)
    .then(event => {
      dispatch(receiveEvent(event));
    }, (errors) => {
      dispatch(receiveEventErrors(errors))
  });
};

export const approveEvent = event => dispatch => {
  return EventUtil.approveEvent(event)
    .then(ApprovedEvent => {
    dispatch(receiveEvent(ApprovedEvent));
  });
};