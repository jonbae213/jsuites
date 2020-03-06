import {CLOSE_MODAL, OPEN_MODAL} from '../../actions/modal_actions';

const ModalReducer = (state={}, action) =>{
  Object.freeze(state);
  
  switch(action.type){
    case OPEN_MODAL:
      const modal = {
        type: action.modal,
        event: action.event
      }
      return modal;
    case CLOSE_MODAL:
      return {};
    default:
      return state;
  }
}

export default ModalReducer;