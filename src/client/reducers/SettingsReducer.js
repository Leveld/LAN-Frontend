import { TOGGLE_SETTINGS } from '../actions';

const SettingsReducer = (settings =  false, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS:
    return !settings;
    default:
    return settings;
  }
};

export default SettingsReducer;
