import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { selectDepts } from '../../actions/sidebar_actions';
import { openModal } from '../../actions/modal_actions';
import { getEvents} from '../../actions/department_actions';

const msp = state =>{
  return ({
    deptIds: state.ui.sidebar.deptIds,
    dispSidebar: state.ui.sidebar.dispSidebar,
    departments: state.entities.departments,
    events: state.entities.events,
    user: state.entities.users[state.session.user]
  })
};

const mdp = dispatch => ({
  selectDepts: deptIds => dispatch(selectDepts(deptIds)),
  openModal: (modal, event) => dispatch(openModal(modal, event)),
  getEvents: events => dispatch(getEvents(events))
});

export default connect(msp, mdp)(Sidebar);