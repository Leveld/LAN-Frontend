import React from 'react';
import {Redirect} from 'react-router';

export const SET_INFO_GRAPHIC_BLOB = 'SET_INFO_GRAPHIC_BLOB';
export const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT';
export const SET_PLATFORMS = 'SET_PLATFORMS';
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const SET_USER = 'SET_USER';


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
  window.localStorage.setItem('authenticated', 0);
  setUser({});
  //<Redirect to={'/error'} />
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