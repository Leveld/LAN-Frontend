import React from 'react';
import { combineReducers } from 'redux';
import InfoGraphicReducer from './infographicReducer';

const rootReducer = combineReducers({
  InfoGraphicBlob: InfoGraphicReducer
});

export default rootReducer;
