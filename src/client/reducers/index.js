import React from 'react';
import { combineReducers } from 'redux';
import InfoGraphicReducer from './infographicReducer';
import SchedulerReducer from './schedulerReducer';

const rootReducer = combineReducers({
  InfoGraphicBlob: InfoGraphicReducer,
  evt: SchedulerReducer
});

export default rootReducer;
