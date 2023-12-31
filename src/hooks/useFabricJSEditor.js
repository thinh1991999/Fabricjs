import { useEffect, useState } from "react";
import {
  FILL,
  STROKE,
  RECTANGLE,
  LINE,
  CIRCLE,
  TEXT,
} from "../constants/defaultShapes";
import { guidGenerator } from "../utils";
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
        id: guidGenerator(),
        name: "Circle" + Math.random() * 10,
        fill: fillColor,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE,
        fill: fillColor,
        name: "Rectangle" + Math.random() * 10,
        id: guidGenerator(),
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
    addText: (text, values) => {
      // use stroke in text fill, fill default is most of the time transparent
      const object = new fabric.Textbox(text, {
        ...TEXT,
        name: "Text" + Math.random() * 10,
        id: guidGenerator(),
        ...values,
      });
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
    uploadImage: (img) => {
      var imgObj = new Image();
      imgObj.src = img.src;
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj, {
          id: guidGenerator(),
          name: "Image" + Math.random() * 10,
        });
        image.scaleToWidth(300, false);
        canvas.centerObject(image);
        canvas.add(image);
        canvas.renderAll();
      };
    },
    updateTextProperties: (type, val) => {
      canvas.getActiveObject().set(type, val);
      canvas.renderAll();
    },
    updateShapeProperties: (type, val) => {
      canvas.getActiveObject().set(type, val);
      canvas.renderAll();
    },
    downloadImage: () => {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1.0,
      });
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "canvas.png";
      a.click();
    },
    downloadJson: () => {
      const json = canvas.toJSON();
      const blob = new Blob([JSON.stringify(json)], {
        type: "application/json",
      });

      // Create a download link for the Blob
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "canvas.json";
      a.click();
    },
    getJson: () => {
      return canvas.toJSON();
    },
    getObjects:()=>{
      return canvas.getObjects();
    },
    selectObj: (id) => {
      canvas.getObjects().forEach(function (o) {
        if (o.id === id) {
          canvas.setActiveObject(o);
        }
      });
    },
    reorderObj: (id, idx) => {
      canvas.getObjects().forEach(function (o) {
        if (o.id === id) {
          o.moveTo(idx);
          return false;
        }
      });
    },
    getImage: () => {
      return canvas.toDataURL({
        format: "png",
        quality: 1.0,
      });
    },
    changeNameObj: (id, newName) => {
      const object = canvas.getObjects().find((obj) => obj.id === id);
      if (object) {
        object.name = newName;
        canvas.renderAll(); // Update the canvas display
      } else {
        console.warn(`Object with ID ${id} not found.`);
      }
    },
    loadCanvasFromJson:(json)=>{
      console.log(canvas);
      canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
    },
    changeImageObject:(id,file)=>{
      console.log(id);
      canvas.getObjects().forEach(function (o) {
        console.log(o);
        if (o.id === id) {
          console.log(o);
          return false;
        }
      });
    }
  };
};

export const useFabricJSEditor = (props = {}) => {
  const { defaultFillColor, defaultStrokeColor, renderLayers } = props;
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
      canvas.on("object:added", () => {
        renderLayers();
      });
      canvas.on("object:removed", () => {
        renderLayers();
      });
    };
    if (canvas) {
      bindEvents(canvas);
    }
  }, [canvas, renderLayers]);

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
