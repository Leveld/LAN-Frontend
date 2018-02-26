import { SET_USER } from '../actions';

const UserReducer = (user = {}, action) => {
  switch (action.type) {
    case SET_USER:
    return action.data;
    default:
    return user;
  }
};

export default UserReducer;
