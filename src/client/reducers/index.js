import React from 'react';
import { combineReducers } from 'redux';
import IGReducer from '../components/INFO_GRAPHICS/redux/reducer';

const rootReducer = combineReducers({
  IGBlob: IGReducer
});

export default rootReducer;
