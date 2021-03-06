import {Cookies} from 'react-cookie';

export const SET_INFO_GRAPHIC_BLOB = 'SET_INFO_GRAPHIC_BLOB';
export const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT';
export const SET_PLATFORMS = 'SET_PLATFORMS';
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const SET_USER = 'SET_USER';
export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_CONVO = 'UPDATE_CONVO';
export const DEL_MESSAGE = 'DEL_MESSAGE';


export const setInfoGraphicBlob = (blob) => {
  return {
    type:  SET_INFO_GRAPHIC_BLOB,
    data: blob
  };
};

export const setCurrentEvent = (evt) => {
  return {
    type: SET_CURRENT_EVENT,
    data: evt
  };
};

export const setPlatforms = (platforms) => {
  return {
    type: SET_PLATFORMS,
    data: platforms
  }
}

export const signIn = () => {
  return {
    type: SIGNIN,
    data: true
  }
}
export const signOut = () => {
  setUser({});
  return {
    type: SIGNOUT,
    data: false
  }
}

export const setUser = (user) => {
  return {
    type: SET_USER,
    data: user
  }
}

export const toggleSettings = () => {
  return {
    type: TOGGLE_SETTINGS
  }
}

export const updateConvo = (data) => {
  return {
    type: UPDATE_CONVO,
    data
  }
};
export const delMsg = (data) => {
  return {
    type: DEL_MESSAGE,
    data
  }
};
export const addMsg = (data) => {
  return {
    type: ADD_MESSAGE,
    data
  }
};


