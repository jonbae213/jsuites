import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    let deptIds = this.props.deptIds;
    this.state = {
      deptIds: deptIds || []
    };

    this.createMeeting = this.createMeeting.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addDept = this.addDept.bind(this);
    this.removeDept = this.removeDept.bind(this);
  }


  createMeeting() {
    const event = {
      title: "",
      date: new Date(),
      description: "",
      extras: {}
    };
    this.props.openModal("create_event", event);
  }

  dispDepts() {

    const helpus = <form className="select-depts">
        <label className="select-depts-title">Departments</label>
          {Object.values(this.props.departments).map( (department, i) => {
            return (
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  key={i}
                  name={department._id}
                  defaultChecked={this.state.deptIds.includes(department._id)}
                  onChange={e => this.handleClick(e)}
                />
                {department.name}
              </label>
            );
          })}
        </form>

    return helpus
  }

  handleClick(e){
      if(e.currentTarget.checked){
        this.addDept(e.currentTarget.name);
      } else {
        this.removeDept(e.currentTarget.name);
      }
  }

  addDept(deptId){
    let newDeptIds = this.state.deptIds.concat([deptId]) || [this.props.user.deptId];
    let eventIds = [];
    this.setState({ deptIds: newDeptIds }, () => {
      this.state.deptIds.forEach( id => {
            this.props.departments[id].eventIds
              .forEach( eventId => eventIds.push(eventId));
            
      })
        this.props.getEvents(eventIds)
        this.props.selectDepts(this.state.deptIds);

    });
    
  } 

  removeDept(deptId){
    let newDeptIds = this.state.deptIds.filter( el => el !== deptId );

    let eventIds = [];
    this.setState({ deptIds: newDeptIds }, () => {
      this.state.deptIds.forEach( id => {
            eventIds.push(this.props.departments[id].eventIds)
            
      })
        this.props.getEvents(eventIds)
        this.props.selectDepts(this.state.deptIds);

    });

  }

  render() {
    if( this.props.dispSidebar ){
      return (
        <section className="sidebar-container">
          {this.dispDepts()}
        </section>
      );
    } else {
      return( <div></div> )
    }
  }
}

export default Sidebar;