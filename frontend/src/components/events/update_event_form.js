import { connect } from 'react-redux';
import { updateEvent, deleteEvent, approveEvent } from '../../actions/event_actions';
import { closeModal } from '../../actions/modal_actions';
import EventForm from './event_form';

const msp = state => ({
  currentUser: state.session.currentUser,
  users: state.entities.users,
  buttonLabels: ["Update Event"]
});

const mdp = dispatch => ({
  updateEvent: event => dispatch(updateEvent(event)),
  closeModal: () => dispatch(closeModal()),
  deleteEvent: eventId => dispatch(deleteEvent(eventId)),
  approveEvent: eventId => dispatch(approveEvent(eventId))
});

export default connect(msp, mdp)(EventForm);