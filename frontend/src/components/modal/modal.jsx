import React from 'react';
import { connect } from 'react-redux';
import CreateEventForm from '../events/create_event_form';
import UpdateEventForm from '../events/update_event_form';
import EventDetails from '../events/event_details';
import { closeModal } from '../../actions/modal_actions';
// import EventDetails fr
const Modal = ({modal, closeModal}) => {
  if (!modal) {
    return null;
  }

  let component;
  switch(modal.type){
    case "event_details":
      component = <EventDetails event={modal.event}/>
      break;
    case "create_event":
      component = <CreateEventForm event={modal.event}/>
      break;
    case "update_event":
      component = <UpdateEventForm event={modal.event}/>
      break;
    case "admin_pending":
      component = <EventDetails event={modal.event}/>
      break;
    default:
      return null;
  }

  return (
    <section className="event-modal-container" onClick={() => closeModal()}>
      <span className="event-modal" onClick={e => e.stopPropagation()}>
        {component}
      </span>
    </section>
  );
}

const msp = state =>({
  user: state.session.user,
  modal: state.ui.modal
});

const mdp = dispatch =>({
  closeModal: () => dispatch(closeModal())
});

export default connect(msp, mdp)(Modal)