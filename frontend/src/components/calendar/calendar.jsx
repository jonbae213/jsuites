import React from 'react';
import DispEventItems from '../events/disp_event_items';

class Calendar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      now: this.getNow(),
      calendar: this.calendar()
    }

    this.createFormClick = this.createFormClick.bind(this);
    this.dispCalendar = this.dispCalendar.bind(this);
    this.offsetByStart = this.offsetByStart.bind(this);
  }

  createFormClick(day) {
    const event ={
      title: "",
      date: day,
      description: "",
      extras: {}
    }
    this.props.openModal("create_event", event);
  }

  getNow(){
    return new Date();
  }

  numDays(){
    const today = new Date();
    const month = today.getMonth();
    const numMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return numMonthDays[month];
  }


  offsetByStart(){
    let first = new Date();
    first.setDate(1);
    return first.getDay();
  }

  calendar(){
    const numDays = this.numDays();
    let dateCount = 1;
    const offsetDays = this.offsetByStart();
    const cal = [];

    for( let j = 0; dateCount <= numDays ; j++){
      let week = [];

      for(let i = 0; i < 7; i++){

        if( j < offsetDays ){
          week.push('');
          j++;

        } else {
        let date = new Date();
        date.setDate(dateCount);
        week.push(date);
        dateCount++;
        }
      }
      cal.push(week);
    }

    return cal;
  }

  dispCalendar(){

    if( this.state.calendar.length > 0){
      return this.state.calendar.map((week, j) => (

        <section className="week" key={j}>
          {week.map((day, i )=> (

            <section key={i} className="date-button">

              <button
                className="create-form-date"
                onClick={() => this.createFormClick(day)}>
                {day ? day.getDate() : <div></div>}
              </button>
              
              <DispEventItems calProps={this.props} day={day}/>

              <button
                className="create-form-blank"
                onClick={() => this.createFormClick(day)} 
              ></button>
            </section>
          ))}
        </section>
      ));
    }
  }

  render(){
    const weekDaysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdaysLi = weekDaysInWeek.map( day => <div className='weekday-items'> {day} </div>)
    if (!this.props.events) return null;
    return (
      <section className="calendar">
        <div className='weekday'>
          {weekdaysLi}
        </div>
        {this.state.calendar ? this.dispCalendar() : <div></div>}
      </section>
    )
  }
}

export default Calendar;