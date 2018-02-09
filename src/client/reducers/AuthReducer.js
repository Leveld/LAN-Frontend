import { SIGNIN, SIGNOUT } from '../actions';

const AuthReducer = (authorized = false, action) => {
  switch (action.type) {
    case SIGNIN:
    case SIGNOUT:
    return action.data;
    default:
    return authorized;
  }
};

export default AuthReducer;
