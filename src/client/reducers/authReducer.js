import { USER_AUTHENTICATED, USER_UNAUTHENTICATED } from '../actions';

export default (auth = {}, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return { authenticated: true };
    case USER_UNAUTHENTICATED:
      return { authenticated: false };
    default:
      return auth;
  }
};