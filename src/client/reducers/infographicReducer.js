import { SET_INFO_GRAPHIC_BLOB } from '../actions';

const InfoGraphicReducer = (info = {accountData: null, blob: null}, action) => {
  switch (action.type) {
    case SET_INFO_GRAPHIC_BLOB:
    return action.data;
    default:
    return info;
  }
};

export default InfoGraphicReducer;
