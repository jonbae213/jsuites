import {
  RECEIVE_ALL_DEPARTMENTS,
  RECEIVE_DEPARTMENT
} from '../actions/department_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_DEPARTMENTS:
      let departments = {};
      Object.values(action.departments.data).forEach(dep => {
        departments[dep._id] = dep 
      });
      return departments;

    // case RECEIVE_DEPARTMENT:
    //   return Object.assign({}, state, {[action.department.data._id]: action.department.data});
    default:
      return state;
  }
}