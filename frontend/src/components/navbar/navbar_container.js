import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import NavBar from './navbar';
import { getAllDepts } from '../../actions/department_actions';
import { fetchAllEvents } from '../../actions/event_actions';
import { getAllUsers } from '../../actions/user_actions';
import { selectDepts, openCloseSidebar } from '../../actions/sidebar_actions';

const msp = state => {
  if (!state.entities) {
    return {};
  }

  return {
    events: state.entities.events,
    users: state.entities.users,
    departments: state.entities.departments,
    user: state.session.user,
    dispSidebar: state.ui.sidebar.dispSidebar
  };
};

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  getAllDepts: () => dispatch(getAllDepts()),
  fetchAllEvents: () => dispatch(fetchAllEvents()),
  getAllUsers: () => dispatch(getAllUsers()),
  selectDepts: deptIds => dispatch( selectDepts( deptIds )),
  openCloseSidebar: dispSidebar => dispatch( openCloseSidebar( dispSidebar ))
})

export default connect(msp, mdp)(NavBar);
