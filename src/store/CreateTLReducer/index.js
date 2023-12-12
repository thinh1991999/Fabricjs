export const initValue = {
  editableTexts: [],
  editableImages: [],
  editableBackgrounds: [],
};

const CreateTLReducer = (state, { type, payload }) => {
  switch (type) {
    case "TOGGLE_EDITABLE_TEXT": {
      console.log(payload);
      const idx = state.editableTexts.findIndex((vl) => vl.id === payload.id);
      if (idx === -1)
        return {
          ...state,
          editableTexts: [...state.editableTexts, payload],
        };
      state.editableTexts.splice(idx, 1);
      return {
        ...state,
      };
    }
    case "TOGGLE_EDITABLE_IMAGE": {
      const idx = state.editableImages.findIndex((vl) => vl.id === payload.id);
      if (idx === -1)
        return {
          ...state,
          editableImages: [...state.editableImages, payload],
        };
      state.editableImages.splice(idx, 1);
      return {
        ...state,
      };
    }
    case "TOGGLE_EDITABLE_SHAPE": {
      const idx = state.editableBackgrounds.findIndex((vl) => vl.id === payload.id);
      if (idx === -1)
        return {
          ...state,
          editableBackgrounds: [...state.editableBackgrounds, payload],
        };
      state.editableBackgrounds.splice(idx, 1);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default CreateTLReducer;
