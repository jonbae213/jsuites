import React from 'react';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    let event = this.props.event
    this.state = {
      event: event,
    }
    this.submitForm = this.submitForm.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateExtra = this.updateExtra.bind(this);
    this.inputList = this.inputList.bind(this);
    this.buttonList = this.buttonList.bind(this);
    this.addExtra = this.addExtra.bind(this);
    this.showList = this.showList.bind(this);
  }

  updateValue(key, e) {
    let updatedEvent = this.state.event;
    updatedEvent[key] = e.currentTarget.value;
    this.setState({
      event: updatedEvent
    });
  }

  updateExtra(extra, e) {
    let updatedEvent = this.state.event;
    updatedEvent.extras[extra] = e.currentTarget.value;
    this.setState({
      event: updatedEvent
    }); 
  }

  submitForm(e) {
    
    e.preventDefault();
    let event = this.state.event;
    let submitRequest;
    if (this.props.createEvent) {
      submitRequest = this.props.createEvent;
    } else {
      submitRequest = this.props.updateEvent;
    }
    submitRequest(event).then(this.props.closeModal());
  }

  inputList() {
    if (Object.keys(this.state.event.extras).length === 0) {
      return (
        <>
          <li className="event-form-list-item" key='1' >
            <label>title</label>
            <input
              className='event-form-title'
              field='title'
              value={this.state.event.title}
              onChange={e => this.updateValue('title', e)}
            />
          </li>
          <li className="event-form-list-item" key='2'>
            <label>description</label>
            <textarea
              className='event-form-description'
              field='description'
              value={this.state.event.description}
              onChange={e => this.updateValue('description', e)}
            />
          </li>
        </>
      );
    } 
      let extraInputs = Object.keys(this.state.event.extras).map((extra, i) => {
        return (
          <li className="event-form-list-item" key={i + 3}>
            <label>{extra}</label>
            <input 
              className={`event-form-${extra}`}
              field={extra}
              value={this.state.event.extras[extra]}
              onChange={e => this.updateExtra(extra, e)}
            />
          </li>
        );
      });
      return (
        <>
          <li className="event-form-list-item" key='1' >
            <label>title</label>
            <input
              className='event-form-title'
              field='title'
              value={this.state.event.title}
              onChange={e => this.updateValue('title')}
            />
          </li>
          <li className="event-form-list-item" key='2'>
            <label>description</label>
            <textarea
              className='event-form-description'
              field='description'
              value={this.state.event.description}
              onChange={e => this.updateValue('description')}
            />
          </li>
          {extraInputs}
        </>
      );
    
  }

  buttonList() {
    return this.props.buttonLabels.map((label, i) => {
      return (
        <li className="event-form-button" key={i}>
          <button onClick={(e) => this.submitForm(e, i)}>{label}</button>
        </li>
      );
    });
  }

  addExtra(e) {
    e.preventDefault();
    const wantToUpdate = e.currentTarget.innerText;
    const updatedEvent = this.state.event;
    updatedEvent.extras[wantToUpdate] = '';
    this.setState({ event: updatedEvent});
  }

  showList(e) {
    e.preventDefault();
    document.getElementsByClassName('add-note-list')[0].classList.toggle('invisible');
  }

  addNoteDropDown(){
    return <div className="add-note-dropdown">
            <button onClick={e => this.showList(e)}>Add Note</button>
            <div className="add-note-list">
              <li className="add-note-list-item" onClick={(e) => {
                this.addExtra(e);
              }}>start time</li>
              <li className="add-note-list-item" onClick={(e) => {
                this.addExtra(e);
              }}>end time</li>
              <li className="add-note-list-item" onClick={(e) => {
                this.addExtra(e);
              }}>snacks</li>
              <li className="add-note-list-item" onClick={(e) => {
                this.addExtra(e);
              }}>tables</li>
              <li className="add-note-list-item" onClick={(e) => {
                this.addExtra(e);
              }}>chairs</li>
              <li className="add-note-list-item" onClick={(e) => {
                this.addExtra(e);
              }}>guest speaker</li>
          </div>
        </div>
  }

  render() {
    return (
      <form className="event-form">
        <h1>{this.props.buttonLabels[0]}</h1>
        {this.inputList()}
        <div className="event-form-buttons">
          {this.addNoteDropDown()}
          {this.buttonList()}
        </div>
      </form>
    );
  }
}

export default EventForm;