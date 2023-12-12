import { useState } from "react";
import { SketchPicker } from "react-color";
import { FileUploader } from "react-drag-drop-files";

const EditBackground = ({ values,idx }) => {
  const [showPickColor, setShowPickColor] = useState(false);
  return (
    <div className="my-2 flex items-center justify-between" key={values.id}>
      <span>{values.name}</span>
      <div className={`relative `} style={
        {
          zIndex:10-idx
        }
      }>
        <button onClick={()=>setShowPickColor(!showPickColor)} className="flex items-center px-2 py-1 rounded-sm bg-gray-100">
          <span className="block w-[20px] h-[20px] bg-gray-500"></span>
          <span>#ccc</span>
        </button>
        {showPickColor && (
        <div className="absolute top-full right-0">
          <SketchPicker
          // color={fill}
          // onChange={(e) => {
          //   setFill(e.hex);
          //   editor?.updateShapeProperties("fill", e.hex);
          // }}
          />
        </div>
      )}
      </div>
    </div>
  );
};
const fileTypes = ["JPG", "PNG", "GIF"];
const EditImages= ({values,editor}) => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    console.log(values);
    console.log(file);
    editor?.changeImageObject(values.id);
  };
  return (
    <div className="my-2">
      <span className="block mb-2">{values.name}</span>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
};


const RightSide = ({ currOptions, editor }) => {
  if (!currOptions) return <></>;

  const { editableBackgrounds, editableImages, editableTexts } = currOptions;

  return (
    <div className="px-10">
      <h2 className="font-bold">Customize</h2>
      <div className="">
        {editableTexts.map((text) => {
          console.log(text);
          return (
            <input
              key={text.id}
              type="text"
              defaultValue=""
              className="my-2 border-gray-300 rounded-sm"
            />
          );
        })}
      </div>
      <h2 className="font-bold mt-10">Background Color</h2>
      <div className="">
        {editableBackgrounds.map((bg,idx) => {
          return <EditBackground values={bg} key={bg.id} idx={idx}/>;
        })}
      </div>
      <h2 className="font-bold mt-10">Text Color</h2>
      <div className="">
        {editableTexts.map((text,idx) => {
          return <EditBackground values={text} key={text.id} idx={idx}/>;
        })}
      </div>
      <h2 className="font-bold mt-10">Images</h2>
      <div className="">
        {editableImages.map((image,idx) => {
          return <EditImages values={image} editor={editor} key={image.id} idx={idx}/>;
        })}
      </div>
    </div>
  );
};

export default RightSide;
