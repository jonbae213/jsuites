import { connect } from 'react-redux';
import { updateEvent, createEvent, deleteEvent, approveEvent } from '../../actions/event_actions';
import React from 'react';

const msp = state => ({
  currentUser: state.session.currentUser,
  users: state.entities.users,
  buttonLabels: ["Update Event", "Create Event", "Delete Event"]
});

const mdp = dispatch => ({
  updateEvent: event => dispatch(updateEvent(event)),
  createEvent: event => dispatch(createEvent(event)),
  deleteEvent: eventId => dispatch(deleteEvent(eventId)),
  approveEvent: eventId => dispatch(approveEvent(eventId))
});

class AdminEventForm extends React.Component {

}

export default connect(msp, mdp)(AdminEventForm);