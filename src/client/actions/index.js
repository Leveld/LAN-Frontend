export const SET_INFO_GRAPHIC_BLOB = 'SET_INFO_GRAPHIC_BLOB';
export const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT';

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
