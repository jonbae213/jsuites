import { SELECT_DEPTS, OPEN_CLOSE_SIDEBAR,} from '../../actions/sidebar_actions';

const sidebarReducer = (state={}, action) =>{
  Object.freeze(state);
  let newState = {};
  switch(action.type){
    case SELECT_DEPTS:
      newState = {
        deptIds: action.deptIds
      }
      return Object.assign({}, state, { deptIds: action.deptIds });

    case OPEN_CLOSE_SIDEBAR:
      const dispSidebar = action.dispSidebar;
      newState = {dispSidebar: !dispSidebar};
      return Object.assign({}, state, newState)

    default:
      return state;
  }
}

export default sidebarReducer;