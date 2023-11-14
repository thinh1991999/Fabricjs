import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { SketchPicker } from "react-color";

const fontFamilyOptions = [
  "Arial",
  "Times New Roman",
  "Helvetica",
  "Courier New",
  "Georgia",
  "Verdana",
  "Impact",
  "Comic Sans MS",
];

// eslint-disable-next-line react/display-name
const TextBuilder = forwardRef((_props, ref) => {
  const [isOpenColor, setIsOpenColor] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [color, setColor] = useState("Black");
  const [fontSize, setFontSize] = useState(16);

  useImperativeHandle(ref, () => ({
    childMethod() {
      return childMethod();
    },
  }));

  function childMethod() {
    return [fontFamily, fontSize];
  }

  const handeChangeColor = (e) => {
    setColor(e.hex);
    _props.changeColor(e.hex);
  };

  const renderContent = useMemo(() => {
    const pickedObject = _props.pickedObject;
    if (!pickedObject) return;
    const type = pickedObject.type;
    const { fontSize: pickedFontSize, fontFamily: pickedFontFamily } =
      pickedObject;
    let pickedFontSizeCurr = pickedFontSize;
    switch (type) {
      case "text":
        return (
          <>
            <select
              name="fontFamily "
              className="border"
              defaultValue={pickedFontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              {fontFamilyOptions.map((font, idx) => {
                return (
                  <option key={idx} id={font}>
                    {font}
                  </option>
                );
              })}
            </select>
            <div className="flex mt-4">
              <button
                className="w-[30px] h-[30px] border"
                onClick={() => setFontSize((prev) => prev - 1)}
              >
                -
              </button>
              <input
                type="number"
                min={1}
                max={100}
                defaultValue={pickedFontSizeCurr}
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-[50px] border text-center"
              />
              <button
                onClick={() => {
                  _props.increaseFontSize();
                  setFontSize((prev) => prev + 1);
                }}
                className="w-[30px] h-[30px] border"
              >
                +
              </button>
            </div>
          </>
        );
      default:
        break;
    }
  }, [_props, fontSize]);
  console.log("render");
  useEffect(() => {
    const pickedObject = _props.pickedObject;
    if (!pickedObject) return;
    const {
      fill,
      fontSize: pickedFontSize,
      fontFamily: pickedFontFamily,
    } = pickedObject;
    setFontSize(pickedFontSize);
    setFontFamily(pickedFontFamily);
    setColor(fill);
  }, [_props]);

  return (
    <div className="flex flex-col items-center">
      {renderContent}
      <div className="mt-4">
        <div className="relative z-50">
          <button
            onClick={() => setIsOpenColor(!isOpenColor)}
            className="flex flex-col items-center border rounded-sm "
          >
            <span>A</span>
            <span
              className="h-[10px] w-[20px] rounded-sm"
              style={{
                background: `${color}`,
              }}
            ></span>
          </button>
          {isOpenColor && (
            <div className="absolute top-[calc(100%_+_10px)] right-1/2 translate-x-1/2">
              <SketchPicker color={color} onChange={handeChangeColor} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default TextBuilder;
