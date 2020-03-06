import React from 'react';
import { connect } from 'react-redux';
import {updateEvent,deleteEvent} from '../../actions/event_actions';
import { closeModal } from "../../actions/modal_actions";

// import { openModal } from '../../actions/modal_actions';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    this.additionalDetails = this.additionalDetails.bind(this);
    this.coreDetails = this.coreDetails.bind(this);
  }
  
  additionalDetails() {
    if (this.props.event.extras) {
      const extraDetails = Object.keys(this.props.event.extras).map((key, i) => {
        return (
          <li className="event-details-item" key={i + 1}>
            <h2>{key}</h2>
            <p>{this.props.event.extras[key]}</p>
          </li>
        );
      });
      return (
        <>
          <h1>Additional Information</h1>
          {extraDetails}
        </>
      );
    }
  }

  coreDetails() {
    return Object.keys(this.props.event).map(key => {
      if (key === 'title' || key === 'description') {
        return (
          <li className="event-details-item">
            <h2>{key}</h2>
            <p>{this.props.event[key]}</p>
          </li>
        )
      }
    });
  }

  approveEvent(e, event){
    e.preventDefault()
    event.approved = true;
    this.props.updateEvent(event).then(this.props.closeModal())
  }

  deleteEvent(e,event){
    e.preventDefault()
    // event.approved = true;
    this.props.deleteEvent(event).then(this.props.closeModal())
  }

  adminButtons() {
      if (!this.props.event.approved) {
        return (
          <div className="event-details-buttons">
            <button onClick={e => this.approveEvent(e,this.props.event)}>Approve Event</button>
            <button onClick={e => this.deleteEvent(e,this.props.event)}>Delete Event</button>
          </div>
        );
      } else {
        return (
          <button onClick={e => this.deleteEvent(e,this.props.event)}>Delete Event</button>
        );
      }
  }
  
  render() {
    const adminButtons = this.props.currentUser.admin ? this.adminButtons() : null;
    return(
      <section className="event-details">
        <h1>Details</h1>
        {this.coreDetails()}
        {this.additionalDetails()}
        {adminButtons}
      </section>

    )
  }
}

const msp = state => ({
  currentUser: state.session.user,
});

const mdp = dispatch => ({
  updateEvent: (event) => dispatch(updateEvent(event)),
  // approveEvent: (event) => dispatch(approveEvent(event)),
  deleteEvent: (event) => dispatch(deleteEvent(event)),
  closeModal: () => dispatch(closeModal())
});

export default connect(msp,mdp)(EventDetails);




// approveForm(e, status){
//   e.preventDefault();
//   let event = this.state.event;
//   if (status === 'Approve') {
//     debugger
//     this.props.approveEvent(event).then(this.props.closeModal());
//   } else {
//     this.props.denyEvent(event).then(this.props.closeModal());
//   }
// }

// buttonList() {
//   return this.props.buttonLabels.map((label, i) => {
//     return (
//       <div className="event-form-buttons" key={i}>
//         <button onClick={(e) => this.submitForm(e, i)}>{label}</button>
//         <button onClick={(e) => this.approveForm(e, 'Approve')}>Approve Event</button>
//         <button onClick={(e) => this.approveForm(e, 'Deny')}>Deny Event</button>

//       </div>


//     );
//   });
// }