import { Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { shapeBorderOptions } from "../constants/canvas";

const ShapeProperties = ({ selectedObject, editor }) => {
  const [stroke, setStroke] = useState();
  const [fill, setFill] = useState();
  const [isShowColor, setIsShowColor] = useState(false);
  const [isShowColorBD, setIsShowColorBD] = useState(false);
  const [borderType, setBorderType] = useState("None");

  const handleChangeShapeBorder = (e) => {
    const type = e.target.value;
    switch (type) {
      case "None":
        editor?.updateShapeProperties("strokeWidth", 0);
        setBorderType("None");
        break;
      case "Solid":
        editor?.updateShapeProperties("strokeWidth", 10);
        editor?.updateShapeProperties("strokeDashArray", null);
        setBorderType("Solid");
        break;
      case "Dot":
        editor?.updateShapeProperties("strokeDashArray", [9, 2]);
        setBorderType("Dot");
        break;
      default:
        break;
    }
    // editor?.updateTextProperties("fontFamily", e.target.value);
    // setFamily(e.target.value);
  };

  useEffect(() => {
    if (!selectedObject) return;
    const { stroke, fill, strokeDashArray, strokeWidth } = selectedObject;
    console.log(selectedObject);
    setStroke(stroke);
    setFill(fill);
    if (strokeWidth) {
      if (strokeDashArray) {
        setBorderType("Dot");
      } else {
        setBorderType("Solid");
      }
    }
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
      <div className="inline-block mr-5">
        <Select
          id="shapeBorder"
          value={borderType}
          onChange={handleChangeShapeBorder}
          required
        >
          {shapeBorderOptions.map((border, idx) => {
            return (
              <option value={border} key={idx}>
                {border}
              </option>
            );
          })}
        </Select>
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
