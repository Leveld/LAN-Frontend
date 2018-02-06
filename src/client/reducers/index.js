import { combineReducers } from 'redux';
import InfoGraphicReducer from './infographicReducer';
import SchedulerReducer from './schedulerReducer';
import AuthReducer from './authReducer';
import NotificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  InfoGraphicBlob: InfoGraphicReducer,
  evt: SchedulerReducer,
  auth: AuthReducer,
  notification: NotificationReducer
});

export default rootReducer;
