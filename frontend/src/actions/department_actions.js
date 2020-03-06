import * as DeptUtil from '../util/department_util';

export const RECEIVE_DEPARTMENT_EVENTS = "RECEIVE_DEPARTMENT_EVENTS";
export const RECEIVE_ALL_DEPARTMENTS = "RECEIVE_ALL_DEPARTMENTS";

export const receiveDeptEvents = events => ({
  type: RECEIVE_DEPARTMENT_EVENTS,
  events
});

export const receiveAllDepts = depts => ({
  type: RECEIVE_ALL_DEPARTMENTS,
  departments: depts
});

export const getAllDepts = () => dispatch => {
  return DeptUtil.fetchAllDepartments()
    .then(depts => {
      dispatch(receiveAllDepts(depts))
    });
};

// export const getDept = (deptId) => dispatch => {
//   return DeptUtil.fetchDepartment(deptId)
//     .then(dept => {
//       dispatch(receiveDept(dept))
//     });
// };


export const getEvents = (events) => dispatch => {
  return dispatch(receiveDeptEvents(events))
}