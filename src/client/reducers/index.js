import { combineReducers } from 'redux';
import InfoGraphicReducer from './infographicReducer';
import SchedulerReducer from './schedulerReducer';

import PlatformReducer from './platformReducer';
import AuthReducer from './authReducer';

const rootReducer = combineReducers({
  InfoGraphicBlob: InfoGraphicReducer,
  evt: SchedulerReducer,
  platforms: PlatformReducer,
  auth: AuthReducer
});

export default rootReducer;
