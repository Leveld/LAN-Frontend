import { SET_CURRENT_EVENT } from '../actions';

const ScheduleReducer = (evt = {id:0}, action) => {
  switch (action.type) {
    case SET_CURRENT_EVENT:
    return action.data;
    default:
    return evt;
  }
};

export default ScheduleReducer;
