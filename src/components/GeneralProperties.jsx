import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { fontFamilyOptions } from "../constants/canvas";

const GeneralProperties = ({ selectedObject, editor }) => {
  const [fontFamily, setFamily] = useState("Arial");
  const [size, setSize] = useState(0);
  const [fill, setFill] = useState(0);
  const [isShowColor, setIsShowColor] = useState(false);
  const [fontWeight, setFontWeight] = useState();
  const [fontStyle, setFontStyle] = useState();
  const [underline, setUnderline] = useState(false);

  useEffect(() => {
    if (!selectedObject) return;
    const {
      fontFamily,
      fontSize,
      fill,
      fontWeight,
      fontStyle,
      underline,
    } = selectedObject;
    console.log(selectedObject);
    setFamily(fontFamily);
    setSize(fontSize);
    setFill(fill);
    setFontWeight(fontWeight);
    setFontStyle(fontStyle);
    setUnderline(underline);
  }, [selectedObject]);
  return (
    <div className="flex items-center">
      <div className="inline-block mr-5">
        <Select
          id="fontfamily"
          value={fontFamily}
          onChange={(e) => {
            editor?.updateTextProperties("fontFamily", e.target.value);
            setFamily(e.target.value);
          }}
          required
        >
          {fontFamilyOptions.map((font, idx) => {
            return (
              <option value={font} key={idx}>
                {font}
              </option>
            );
          })}
        </Select>
      </div>
      <div className="flex items-center mr-5">
        <button
          className="w-[40px] h-[40px] border rounded-sm"
          onClick={() => {
            const vl = size - 1;
            editor?.updateTextProperties("fontSize", vl);
            setSize(vl);
          }}
        >
          -
        </button>
        <TextInput
          className="w-[100px] remove-arrow"
          type="number"
          value={size}
          onChange={(e) => {
            //  const vl=e.target.value;
            //  editor?.updateTextProperties("fontSize",vl);
            //  setSize(vl);
          }}
        />
        <button
          className="w-[40px] h-[40px] border rounded-sm"
          onClick={() => {
            const vl = size + 1;
            editor?.updateTextProperties("fontSize", vl);
            setSize(vl);
          }}
        >
          +
        </button>
      </div>
      <div className="flex flex-col relative z-50">
        <button
          className="p-2 rounded-sm hover:opacity-50 "
          onClick={() => setIsShowColor(!isShowColor)}
        >
          <span>A</span>
          <div
            className={`h-[10px] w-[20px] `}
            style={{
              backgroundColor: fill,
            }}
          ></div>
        </button>
        {isShowColor && (
          <div className="absolute top-full left-1/2 -translate-x-1/2">
            <SketchPicker
              color={fill}
              onChange={(e) => {
                setFill(e.hex);
                editor?.updateTextProperties("fill", e.hex);
              }}
            />
          </div>
        )}
      </div>
      <Button
        onClick={() => {
          if (fontWeight === "bold") {
            editor?.updateTextProperties("fontWeight", "normal");
            setFontWeight();
          } else {
            editor?.updateTextProperties("fontWeight", "bold");
            setFontWeight("bold");
          }
        }}
        color={fontWeight === "bold" ? "dark" : "light"}
        className="mx-2 font-bold"
      >
        B
      </Button>
      <Button
        onClick={() => {
          if (fontStyle === "italic") {
            editor?.updateTextProperties("fontStyle", "normal");
            setFontStyle();
          } else {
            editor?.updateTextProperties("fontStyle", "italic");
            setFontStyle("italic");
          }
        }}
        color={fontStyle === "italic" ? "dark" : "light"}
        className="mx-2 italic"
      >
        I
      </Button>
      <Button 
       onClick={() => {
        if (underline) {
          editor?.updateTextProperties("underline", false);
          setUnderline();
        } else {
          editor?.updateTextProperties("underline", true);
          setUnderline(true);
        }
      }}
      color={underline ? "dark" : "light"} className="mx-2 underline">
        U
      </Button>
    </div>
  );
};

export default GeneralProperties;
