export const SET_INFO_GRAPHIC_BLOB = 'SET_INFO_GRAPHIC_BLOB';
export const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT';

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';

export const ERROR_NOTIFICATION = 'ERROR_NOTIFICATION';
export const SUCCESS_NOTIFICATION = 'SUCCESS_NOTIFICATION';
export const INFO_NOTIFICATION = 'INFO_NOTIFICATION';


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

export const signUp = ({username, password, confirmPassword}) => {  // this is normal email/password registration.
  return (dispatch) => {
    // in the future use axios to send info to the sign up end point to implement actual authentication and account creation
    // also need to redirect the user to their dashboard page, probably
    if (password !== confirmPassword) {
      dispatch({
        type: ERROR_NOTIFICATION,
        payload: 'Passwords do not match'
      });
    } else {
      dispatch({
        type: USER_AUTHENTICATED
      });
    }
  };
};

export const signIn = ({username, password}) => {  // this is just for logging in using email/password 
  return (dispatch) => {
    // in the future use axios to send info to the log in end point to implement actual authentication 
    // also need to redirect the user to their dashboard page, probably
    dispatch({
      type: USER_AUTHENTICATED
    });
  };
};


export const signOut = () => {
  return dispatch => {
    // in the future use axios to send request to the log out end point
    // also need to redirect the user to the home page, probably
    dispatch({
      type: USER_UNAUTHENTICATED
    });
  };
};