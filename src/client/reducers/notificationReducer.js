import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION, INFO_NOTIFICATION } from '../actions';

export default (notification = {}, action) => {
  switch (action.type) {
    case ERROR_NOTIFICATION:
      return { 
        message: action.payload,
        type: 'error'
      };
    case SUCCESS_NOTIFICATION:
      return { 
        message: action.payload,
        type: 'success'
      };
    case INFO_NOTIFICATION:
      return { 
        message: action.payload,
        type: 'info'
      };
    default:
      return notification;
  }
}