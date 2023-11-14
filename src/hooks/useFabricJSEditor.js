import { useEffect, useState } from "react";
import {
  FILL,
  STROKE,
  RECTANGLE,
  LINE,
  CIRCLE,
} from "../constants/defaultShapes";

/**
 * Creates editor
 */
const buildEditor = (
  canvas,
  fillColor,
  strokeColor,
  _setFillColor,
  _setStrokeColor
) => {
  return {
    canvas,
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE,
        fill: fillColor,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE,
        fill: fillColor,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addLine: () => {
      const object = new fabric.Line(LINE.points, {
        ...LINE.options,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addText: (text) => {
      // use stroke in text fill, fill default is most of the time transparent
      const object = new fabric.Textbox(text, { ...TEXT, fill: strokeColor });
      object.set({ text: text });
      canvas.add(object);
    },
    updateText: (text) => {
      const objects = canvas.getActiveObjects();
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject = objects[0];
        textObject.set({ text });
        canvas.renderAll();
      }
    },
    deleteAll: () => {
      canvas.getObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    deleteSelected: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    fillColor,
    strokeColor,
    setFillColor: (fill) => {
      _setFillColor(fill);
      canvas.getActiveObjects().forEach((object) => object.set({ fill }));
      canvas.renderAll();
    },
    setStrokeColor: (stroke) => {
      _setStrokeColor(stroke);
      canvas.getActiveObjects().forEach((object) => {
        if (object.type === TEXT.type) {
          // use stroke in text fill
          object.set({ fill: stroke });
          return;
        }
        object.set({ stroke });
      });
      canvas.renderAll();
    },
    zoomIn: (scaleStep) => {
      const zoom = canvas.getZoom();
      canvas.setZoom(zoom / scaleStep);
    },
    zoomOut: (scaleStep) => {
      const zoom = canvas.getZoom();
      canvas.setZoom(zoom * scaleStep);
    },
  };
};

export const useFabricJSEditor = (props = {}) => {
  const { defaultFillColor, defaultStrokeColor } = props;
  const [canvas, setCanvas] = useState(null);
  const [fillColor, setFillColor] = useState(defaultFillColor || FILL);
  const [strokeColor, setStrokeColor] = useState(defaultStrokeColor || STROKE);
  const [selectedObjects, setSelectedObject] = useState([]);
  useEffect(() => {
    const bindEvents = (canvas) => {
      canvas.on("selection:cleared", () => {
        setSelectedObject([]);
      });
      canvas.on("selection:created", (e) => {
        setSelectedObject(e.selected);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObject(e.selected);
      });
    };
    if (canvas) {
      bindEvents(canvas);
    }
  }, [canvas]);

  return {
    selectedObjects,
    onReady: (canvasReady) => {
      console.log("Fabric canvas ready");
      setCanvas(canvasReady);
    },
    editor: canvas
      ? buildEditor(
          canvas,
          fillColor,
          strokeColor,
          setFillColor,
          setStrokeColor
        )
      : undefined,
  };
};
