export const initValue = {
  selectedObject: null,
};

const EditTLReducer = (state, { type, payload }) => {
  switch (type) {
    case "CHANGE_OBJECT":
      return {
        ...state,
        selectedObject: payload,
      };
    default:
      return state;
  }
};

export default EditTLReducer;
