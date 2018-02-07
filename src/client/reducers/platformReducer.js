import { SET_PLATFORMS } from '../actions';

const PlatformReducer = (platforms = [], action) => {
  switch (action.type) {
    case SET_PLATFORMS:
    return action.data;
    default:
    return platforms;
  }
};

export default PlatformReducer;
