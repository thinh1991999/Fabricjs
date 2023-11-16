import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

const ShapeProperties = ({ selectedObject, editor }) => {
  const [stroke, setStroke] = useState();
  const [fill, setFill] = useState();
  const [isShowColor, setIsShowColor] = useState(false);
  const [isShowColorBD, setIsShowColorBD] = useState(false);

  useEffect(() => {
    if (!selectedObject) return;
    const { stroke, fill } = selectedObject;
    setStroke(stroke);
    setFill(fill);
  }, [selectedObject]);

  return (
    <div className="flex items-center">
      <div className="mx-2 z-50 relative w-[40px] h-[40px] border">
        <button
          onClick={() => setIsShowColor(!isShowColor)}
          className="w-full h-full"
          style={{
            backgroundColor: fill,
          }}
        ></button>
        {isShowColor && (
          <div className="absolute top-full left-1/2 -translate-x-1/2">
            <SketchPicker
              color={fill}
              onChange={(e) => {
                setFill(e.hex);
                editor?.updateShapeProperties("fill", e.hex);
              }}
            />
          </div>
        )}
      </div>
      <div
        className="mx-2 z-50 relative w-[40px] h-[40px] border"
        style={{
          backgroundColor: stroke,
        }}
      >
        <button
          onClick={() => setIsShowColorBD(!isShowColorBD)}
          className="w-full h-full flex items-center justify-center"
        >
          <div
            className="w-[15px] h-[15px] bg-red-400"
            style={{
              backgroundColor: fill,
            }}
          ></div>
        </button>
        {isShowColorBD && (
          <div className="absolute top-full left-1/2 -translate-x-1/2">
            <SketchPicker
              color={fill}
              onChange={(e) => {
                setStroke(e.hex);
                editor?.updateShapeProperties("stroke", e.hex);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShapeProperties;
