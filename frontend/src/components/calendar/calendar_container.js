import { connect } from 'react-redux';
import Calendar from './calendar';
import { openModal } from '../../actions/modal_actions';
// import { getDept } from '../../actions/department_actions';

// const getDepts = ( depts, sidebar ) =>{
//   let selectedDepts = {}

//   if ( sidebar.deptIds.length && Object.keys(depts).length > 0 ) {
//     Object.values(sidebar.deptIds).forEach(deptId => {
//       selectedDepts[deptId] = depts[deptId];
//     });
//   }


//   return selectedDepts;
// }

const msp = state => {

  if (!state.entities) return {};

  // const departments = getDepts(state.entities.departments, state.ui.sidebar)

  return { 
    users: state.entities.users,
    user: state.session.user,
    departments: state.entities.departments,
    events: state.entities.events,
    eventIds: state.ui.departmentEvents
  }
};

const mdp = dispatch =>({
  openModal: (modal, event) => dispatch(openModal(modal, event)),
  // getDept: deptId => dispatch( getDept( deptId ))
});

export default connect(msp, mdp)( Calendar );