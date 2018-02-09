import { combineReducers } from 'redux';
import InfoGraphicReducer from './infographicReducer';
import SchedulerReducer from './schedulerReducer';

import PlatformReducer from './platformReducer';

import UserReducer from './UserReducer';
import AuthReducer from './authReducer';

const rootReducer = combineReducers({
  InfoGraphicBlob: InfoGraphicReducer,
  evt: SchedulerReducer,
  platforms: PlatformReducer,
  auth: AuthReducer,
  user: UserReducer
}); 

export default rootReducer;
