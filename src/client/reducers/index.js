import { combineReducers } from 'redux';
import InfoGraphicReducer from './infographicReducer';
import SchedulerReducer from './schedulerReducer';
import PlatformReducer from './platformReducer';

const rootReducer = combineReducers({
  InfoGraphicBlob: InfoGraphicReducer,
  evt: SchedulerReducer,
  platforms: PlatformReducer
});

export default rootReducer;
