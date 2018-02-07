import { FILTER_PLATFORMS, SET_PLATFORMS } from '../actions';
import Platform from '../components/Platform/Platform';

const PlatformReducer = (platforms = [], action) => {
  switch (action.type) {
    case FILTER_PLATFORMS:
    if(action.data === '') return [{name:'platforms'}];
    return platforms.filter((platform) => platform.name.startsWith(action.data))
    case SET_PLATFORMS:
    return action.data;
    default:
    return platforms;
  }
};

export default PlatformReducer;
