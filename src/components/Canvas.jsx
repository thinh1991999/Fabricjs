import { useEffect } from "react";
import { useRef } from "react";
import { fabric } from "fabric";

const Canvas = ({ onReady }) => {
  const canvasEl = useRef(null);
  const canvasElParent = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);
    const setCurrentDimensions = () => {
      canvas.setHeight(500 || 0);
      canvas.setWidth(500 || 0);
      canvas.renderAll();
    };
    const resizeCanvas = () => {
      setCurrentDimensions();
    };

    const handleKeyUp = (e) => {
      const keyCode = e.keyCode;
      console.log(keyCode);
      switch (keyCode) {
        //Delete
        case 46:
          canvas.remove(canvas.getActiveObject());
          break;
        //ESC
        case 27:
          canvas.discardActiveObject().renderAll();
          break;
        default:
          break;
      }
    };

    setCurrentDimensions();

    window.addEventListener("resize", resizeCanvas, false);
    window.addEventListener("keyup", handleKeyUp, false);

    if (onReady && typeof onReady === "function") {
      onReady(canvas);
    }
    return () => {
      canvas.dispose();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keyup", deleteObject);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={canvasElParent} className="flex items-center justify-center">
      <canvas ref={canvasEl} className="border border-gray-400" />
    </div>
  );
};

export default Canvas;
