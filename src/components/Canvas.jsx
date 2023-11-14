import { useEffect } from "react";
import { useRef } from "react";
import { fabric } from "fabric";

const Canvas = ({ onReady }) => {
  const canvasEl = useRef(null);
  const canvasElParent = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);
    const setCurrentDimensions = () => {
      canvas.setHeight(canvasElParent.current?.clientHeight || 0);
      canvas.setWidth(canvasElParent.current?.clientWidth || 0);
      canvas.renderAll();
    };
    const resizeCanvas = () => {
      setCurrentDimensions();
    };
    setCurrentDimensions();

    window.addEventListener("resize", resizeCanvas, false);
    console.log(onReady);
    if (onReady && typeof onReady === "function") {
      onReady(canvas);
    }
    return () => {
      canvas.dispose();
      window.removeEventListener("resize", resizeCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={canvasElParent} className="h-full">
      <canvas ref={canvasEl} />
    </div>
  );
};

export default Canvas;
