import React from 'react';

class DispEventItems extends React.Component{
  constructor(props){
    super(props)
    this.dayInfo = this.dayInfo.bind(this);
    this.employeeDisp = this.employeeDisp.bind(this);
    this.adminDisp = this.adminDisp.bind(this);
    this.sidebar = this.sidebar.bind(this);
  }


  employeeDisp(openModal, events, user){
    return (
      events.map(event => (
        event.approved ?
          <button className="event-index-item" onClick={() => openModal("event_details", event)}>{event.title}</button> :
          (
            event.hostId === user.id ? 
              <button className="event-pending-item" onClick={() => openModal("update_event", event)}>{event.title}</button> :
              <div></div>
          )
      ))
    )
  }
  
  dayInfo(eventDay, day){
    // const info = day.toLocaleString( 'default', {year: 'numeric', month: 'long', day: 'numeric'})
    const equivalent = ( (eventDay.getMonth()=== day.getMonth()) && (eventDay.getDate() === day.getDate()) && (eventDay.getFullYear() === day.getFullYear()) )
    
    return equivalent;
  }

  adminDisp(openModal, events){
    return(
      events.map( event =>(
        event.approved ?
          <button className="event-index-item" onClick={()=> openModal("event_details", event)}>{event.title}</button> :
          <button className="event-pending-item" onClick={() => openModal("admin_pending", event)}>{event.title}</button>
      ))
    )
  }

  sidebar(){
      const {openModal, departments, events, user, eventIds } = this.props.calProps 
      const { day, calProps } = this.props;
      let dayEvents = []

      if (eventIds.length){
        eventIds.flat(Infinity).forEach(eventId => {
          let eventDate = new Date (events[eventId].date);
          if (this.dayInfo( eventDate, day)) {
            dayEvents.push(events[eventId]);
          }
        });
      }
      
      if(user.admin){
        return(
          this.adminDisp(openModal, dayEvents)
        )
      } else {
        return(
          this.employeeDisp(openModal, dayEvents, user)
        )
      }
    
  }

  render(){
    const { day, calProps } = this.props;
    const { user, departments, events, openModal } = calProps;
    const dayEvents = [];

    // if( day && Object.keys(departments).length ){
    //     return this.sidebar()
    // } else {
    //     return( <div></div>)
    // }
     const side = (day && Object.keys(departments).length && Object.keys(events).length) ? this.sidebar() : null;
    return <>
        {side}
    </>
  }
}



// const dispEventItems = (props) =>{
//   // debugger
//   const { day, calProps } = props;
//   const { user, departments, events, openModal } = calProps;
//   const dayEvents = [];
//   debugger
//   if( day && Object.keys(departments).length ){
//     Object.values(departments).forEach(department => {
//       debugger
//       if( department.eventIds){
//         debugger
//         department.eventIds.forEach(eventId => {
//           let eventDate = new Date (events[eventId].date);
//           if (dayInfo( eventDate, day)) {
//             dayEvents.push(events[eventId]);
//           }
//         });
//       }
//     });

//     if(user.admin){
//       return(
//         adminDisp(openModal, dayEvents)
//       )
//     } else {
//       return(
//         employeeDisp(openModal, dayEvents, user)
//       )
//     }
//   } else {
//     return( <div></div>)
//   }

// }

// const dayInfo = (eventDay, day) => {
//   // const info = day.toLocaleString( 'default', {year: 'numeric', month: 'long', day: 'numeric'})
//   const equivalent = ( (eventDay.getMonth()=== day.getMonth()) && (eventDay.getDate() === day.getDate()) && (eventDay.getFullYear() === day.getFullYear()) )
  
//   return equivalent;
// }

// const adminDisp = (openModal, events) =>{
//   return(
//     events.map( event =>(
//       event.approved ?
//         <button className="event-index-item" onClick={()=> openModal("event_details", event)}>{event.title}</button> :
//         <button className="event-pending-item" onClick={() => openModal("admin_pending", event)}>{event.title}</button>
//     ))
//   )
// }

// const employeeDisp = (openModal, events, user) => {
//   return (
//     events.map(event => (
//       event.approved ?
//         <button className="event-index-item" onClick={() => openModal("event_details", event)}>{event.title}</button> :
//         (
//           event.hostId === user.id ? 
//             <button className="event-pending-item" onClick={() => openModal("event_details", event)}>{event.title}</button> :
//             <div></div>
//         )
//     ))
//   )
// }

export default DispEventItems;