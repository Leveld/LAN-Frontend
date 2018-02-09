import { SIGNIN, SIGNOUT } from '../actions';

export default (authenticated = {}, action) => {
  switch (action.type) {
    case SIGNIN:
    case SIGNOUT:
    return action.data;
    default:
      return authenticated;
  }
};