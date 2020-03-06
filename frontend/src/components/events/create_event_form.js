import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import { closeModal } from "../../actions/modal_actions";
import EventForm from './event_form';

const msp = state => ({
  currentUser: state.session.currentUser,
  users: state.entities.users,
  buttonLabels: ["Create Event"]
});

const mdp = dispatch => ({
  createEvent: event => dispatch(createEvent(event)),
  closeModal: () => dispatch(closeModal())
});

export default connect(msp, mdp)(EventForm);