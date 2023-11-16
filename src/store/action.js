export const changeObjectEditTL = (payload) => {
  return {
    type: "CHANGE_OBJECT",
    payload,
  };
};


export const toggleEditableText = (payload) => {
  return {
    type: "TOGGLE_EDITABLE_TEXT",
    payload,
  };
};

export const toggleEditableImage = (payload) => {
  return {
    type: "TOGGLE_EDITABLE_IMAGE",
    payload,
  };
};
