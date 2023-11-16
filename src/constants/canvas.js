import { addCircle, addSquare, addText } from "../utils/canvas";

export const fontsizes = [];

export const lines = [{}];

export const shapes = [
  {
    title: "square",
    function: addSquare,
  },
  {
    title: "circle",
    function: addCircle,
  },
];

export const defaultTexts = [
  {
    title: "Add a heading",
    function: addText,
    size: "xl",
    fontsize: 40,
  },
  {
    title: "Add a subheading",
    function: addText,
    size: "md",
    fontsize: 30,
  },
  {
    title: "Add a little bit of body text",
    function: addText,
    size: "sm",
    fontsize: 16,
  },
];

export const canvasTypes={
  CIRCLE:"circle",
  RECT:"rect",
  TEXT:"text",
  IMAGE:"image"
}

export const fontFamilyOptions = [
  "Arial",
  "Times New Roman",
  "Helvetica",
  "Courier New",
  "Georgia",
  "Verdana",
  "Impact",
  "Comic Sans MS",
];
