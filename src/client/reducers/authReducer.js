import { SIGNIN, SIGNOUT } from '../actions';

export default (authenticated = false, action) => {
  switch (action.type) {
    case SIGNIN:
    case SIGNOUT:
    return action.data;
    default:
      return authenticated;
  }
};