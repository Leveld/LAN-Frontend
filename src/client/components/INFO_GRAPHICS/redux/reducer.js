import {SET_IG_BLOB} from './actions';

const IGReducer = (blob = null, action) => {
  switch (action.type) {
    case SET_IG_BLOB:
    return action.data;
    default:
    return blob;
  }
};

export default IGReducer;