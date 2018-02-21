import { combineReducers } from 'redux';
import InfoGraphicReducer from './infographicReducer';
import SchedulerReducer from './schedulerReducer';

import PlatformReducer from './platformReducer';

import UserReducer from './UserReducer';
import AuthReducer from './authReducer';

import SettingsReducer from './SettingsReducer';

const rootReducer = combineReducers({
  InfoGraphicBlob: InfoGraphicReducer,
  evt: SchedulerReducer,
  platforms: PlatformReducer,
  auth: AuthReducer,
  user: UserReducer,
  settings: SettingsReducer
}); 

export default rootReducer;
