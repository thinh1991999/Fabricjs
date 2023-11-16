export const addSquare = (editor) => {
  editor?.addRectangle();
};

export const addCircle = (editor) => {
  editor?.addCircle();
};

export const addText = (editor, text, size) => {
  editor?.addText(text, {
    fontSize: size,
  });
};
