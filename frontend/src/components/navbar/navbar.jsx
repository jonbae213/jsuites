import React from 'react';
// import './navbar.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentDidMount() {
    this.props.getAllUsers()
      .then(() => this.props.getAllDepts())
      .then(() => this.props.fetchAllEvents())
      .then( () => this.props.selectDepts( [this.props.user.deptId] ))
    // 
  }

  render() {

    if (!Object.values(this.props.departments).length) return null;
    const currentDate = new Date()
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
      <nav className="navbar">
        <button className="sidebar-btn" 
          onClick={()=>this.props.openCloseSidebar(this.props.dispSidebar)}>Sidebar</button>
            
        <h1>{month} {year}</h1>
        <button className="logout-btn" onClick={(e) => this.logoutUser(e)}>Logout</button>
      </nav>
    );
  }
}

export default NavBar;