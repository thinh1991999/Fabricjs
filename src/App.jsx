import { useCallback, useRef, useState } from "react";
import "./App.css";
import { fabric } from "fabric";
import { useEffect } from "react";
import TextBuilder from "./components/TextBuilder";

function App() {
  const canvasEl = useRef();
  const canvasElParent = useRef();

  const canvasElTwo = useRef();
  const canvasElParentTwo = useRef();

  const [canvas, setCanvas] = useState();
  const [canvasTwo, setCanvasTwo] = useState();
  const [nameRec, setNameRec] = useState();
  const [pickedObject, setPickedObject] = useState(null);

  const textBuilderRef = useRef();
  console.log(pickedObject);
  const handleZoomOut = () => {
    const zoom = canvas.getZoom();
    canvas.setZoom(zoom / 0.5);
  };

  const handleZoomIn = () => {
    const zoom = canvas.getZoom();
    canvas.setZoom(zoom * 0.5);
  };

  const generateImage = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1.0,
      });
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "canvas.png";
      a.click();
    }
  };

  const generateObject = () => {
    if (canvas) {
      const json = canvas.toJSON();
      console.log(json);
      // const blob = new Blob([JSON.stringify(json)], {
      //   type: "application/json",
      // });

      // // Create a download link for the Blob
      // const a = document.createElement("a");
      // a.href = URL.createObjectURL(blob);
      // a.download = "canvas.json";
      // a.click();
    }
  };

  const addRectangle = () => {
    if (canvas) {
      const object = new fabric.Rect({
        left: 100,
        top: 100,
        width: 40,
        height: 40,
        angle: 0,
        fill: "red",
        stroke: "red",
        name: nameRec,
      });
      canvas.add(object);
    }
  };

  const addText = () => {
    if (canvas) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const [fontFamily, fontSize] = textBuilderRef.current?.childMethod();
      const object = new fabric.Textbox("abc", {
        type: "text",
        left: 100,
        top: 100,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fill: "blue",
      });
      object.set({ text: "abcd" });
      canvas.add(object);
    }
  };

  const increaseFontSize = useCallback(() => {
    const currentFontSize = pickedObject.get("fontSize");
    const newFontSize = currentFontSize + 1; // Increase by 1

    pickedObject.set("fontSize", newFontSize);
    canvas.renderAll();
  }, [pickedObject, canvas]);

  const changeColor = useCallback(
    (color) => {
      pickedObject.set("fill", color);
      canvas.renderAll();
    },
    [pickedObject, canvas]
  );

  async function parseJsonFile(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(file);
    });
  }
  const onOpenFileJson = (e) => {
    const file = e.target.files[0];
    parseJsonFile(file)
      .then((vl) => {
        canvasTwo.loadFromJSON(vl, function () {
          canvasTwo.renderAll();
          canvas.forEachObject(function (obj) {
            obj.selectable = true;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // function onReaderLoad(event) {
  //   console.log(event.target.result);
  //   var obj = JSON.parse(event.target.result);
  //   alert_data(obj.name, obj.family);
  // }
  console.log("render parent");
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);
    const canvasTwo = new fabric.Canvas(canvasElTwo.current);

    setCanvas(canvas);
    const setCurrentDimensions = () => {
      canvas.setHeight(canvasElParent.current?.clientHeight || 0);
      canvas.setWidth(canvasElParent.current?.clientWidth || 0);
      canvas.renderAll();
      canvasTwo.setHeight(canvasElParentTwo.current?.clientHeight || 0);
      canvasTwo.setWidth(canvasElParentTwo.current?.clientWidth || 0);
      canvasTwo.renderAll();
    };
    const resizeCanvas = () => {
      setCurrentDimensions();
    };
    setCurrentDimensions();
    window.addEventListener("resize", resizeCanvas, false);
    setCanvas(canvas);
    setCanvasTwo(canvasTwo);
    const deleteEv = function (event) {
      if (event.key === "Delete") {
        // Check if there's a selected object
        if (canvas.getActiveObject()) {
          // Remove the selected object from the canvas
          canvas.remove(canvas.getActiveObject());
          canvas.discardActiveObject(); // Deselect the object
          canvas.renderAll(); // Render the updated canvas
        }
      }
    };
    document.addEventListener("keydown", deleteEv);

    canvas.on("mouse:down", function (event) {
      const target = event.target;

      if (target) {
        // An object on the canvas was clicked
        // console.log("Object clicked:", target);
        setPickedObject(target);
        // You can now manipulate or interact with the selected object
        // For example, change its properties or perform some action
        // target.set("fill", "red"); // Change the fill color to red
        canvas.renderAll(); // Render the canvas to see the changes
      } else {
        // No object was clicked (canvas background)
        setPickedObject(null);
      }
    });
    return () => {
      canvas.dispose();
      canvasTwo.dispose();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("keydown", deleteEv);
    };
  }, []);
  return (
    <div className="">
      <button onClick={() => textBuilderRef.current?.childMethod()}>
        click
      </button>
      <div className="flex">
        <div className="w-1/5">
          <TextBuilder
            ref={textBuilderRef}
            pickedObject={pickedObject}
            increaseFontSize={increaseFontSize}
            changeColor={changeColor}
          />
        </div>
        <div className="w-3/5  relative">
          <div className="bg-slate-400">
            <div ref={canvasElParent} className="">
              <canvas ref={canvasEl} width="500px" height="500px" />
            </div>
            <button
              onClick={() => handleZoomIn()}
              className="absolute top-5 right-5 w-[20px] h-[20px] bg-red-500 flex justify-center items-center"
            >
              -
            </button>
            <button
              onClick={() => handleZoomOut()}
              className="absolute top-14 right-5 w-[20px] h-[20px] bg-red-500 flex justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
        <div className="w-1/5 flex flex-col  items-center">
          <button
            onClick={() => generateImage()}
            className="p-4 rounded-md bg-blue-500 flex justify-center items-center"
          >
            Down Image
          </button>
          <button
            onClick={() => generateObject()}
            className="mt-2 p-4 rounded-md bg-green-500 flex justify-center items-center"
          >
            Down Object
          </button>
          <input
            type="text"
            className="border"
            onChange={(e) => setNameRec(e.target.value)}
          />
          <button
            onClick={() => addRectangle()}
            className="mt-2 p-4 rounded-md bg-green-500 flex justify-center items-center"
          >
            Add Rectangle
          </button>
          <button
            onClick={() => addText()}
            className="mt-2 p-4 rounded-md bg-green-500 flex justify-center items-center"
          >
            Add Text
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/5">
          <input type="file" onChange={(e) => onOpenFileJson(e)} />
        </div>
        <div className="w-3/5  relative">
          <div className="mt-20 bg-stone-200">
            <div ref={canvasElParentTwo} className="">
              <canvas ref={canvasElTwo} width="500px" height="500px" />
            </div>
          </div>
        </div>
        <div className="w-1/5 flex flex-col  items-center">
          {/* <button
            onClick={() => generateImage()}
            className="p-4 rounded-md bg-blue-500 flex justify-center items-center"
          >
            Down Image
          </button>
          <button
            onClick={() => generateObject()}
            className="mt-2 p-4 rounded-md bg-green-500 flex justify-center items-center"
          >
            Down Object
          </button>
          <button
            onClick={() => addRectangle()}
            className="mt-2 p-4 rounded-md bg-green-500 flex justify-center items-center"
          >
            Add Rectangle
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
