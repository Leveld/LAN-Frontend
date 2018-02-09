import { combineReducers } from 'redux';
import InfoGraphicReducer from './infographicReducer';
import SchedulerReducer from './schedulerReducer';
import PlatformReducer from './platformReducer';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  InfoGraphicBlob: InfoGraphicReducer,
  evt: SchedulerReducer,
  platforms: PlatformReducer,
  auth: AuthReducer,
  user: UserReducer
}); 

export default rootReducer;
