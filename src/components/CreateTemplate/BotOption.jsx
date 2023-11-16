import { Button, TextInput } from "flowbite-react";
import { useContext, useMemo, useState } from "react";
import { CreateTemplateContext } from "../../pages/CreateTemplate";
import { canvasTypes } from "../../constants/canvas";
import { toggleEditableImage, toggleEditableText } from "../../store/action";

const BotOption = () => {
  const [zoom, setZoom] = useState(100);
  const editor = useContext(CreateTemplateContext).editor;
  const selectedObjects = useContext(CreateTemplateContext).selectedObjects;
  const state = useContext(CreateTemplateContext).state;
  const dispatch = useContext(CreateTemplateContext).dispatch;

  console.log(state);
  console.log("BotOption", editor);

  const handleZoom = (e) => {
    if (!editor) return;
    const vl = e.target.value;
    setZoom(vl);
    if (vl <= zoom) {
      editor.zoomOut(vl / zoom);
    } else {
      editor.zoomIn(zoom / vl);
    }
  };

  const downLoadImage=()=>{
    const obj={
      options:{...state},
      img:editor?.getImage(),
      canvasObj:editor?.getJson()
    }
    console.log(obj);
  }

  const isEditable = useMemo(() => {
    console.log(state);
    if (selectedObjects.length < 1 || !state) return;
    const id = selectedObjects[0].id;
    const { editableTexts, editableImages, editableBackgrounds } = state;
    const arr = [...editableTexts, ...editableImages, ...editableBackgrounds];
    return arr.includes(id);
  }, [selectedObjects, state]);

  const handleSetEditable = () => {
    const id = selectedObjects[0].id;
    console.log(selectedObjects[0].get("type"));
    switch (selectedObjects[0].get("type")) {
      case canvasTypes.CIRCLE:
        break;
      case canvasTypes.TEXT:
        dispatch(toggleEditableText(id));
        break;
      case canvasTypes.IMAGE:
        dispatch(toggleEditableImage(id));
        break;
      default:
        break;
    }
  };

  return (
    <div className="py-2 bg-white border-t-2 flex justify-between items-center">
      <div className="">
        <div className="flex items-center">
          <TextInput
            id="element"
            type="range"
            value={zoom}
            min={1}
            max={500}
            step={1}
            onChange={handleZoom}
          />
          <span className="ml-2 font-light">{zoom}%</span>
        </div>
        {selectedObjects.length > 0 && (
          <>
            <div className="flex">
              <label htmlFor="">Is Editable</label>
              <TextInput
                id="element"
                type="checkbox"
                checked={isEditable}
                onChange={handleSetEditable}
                className="ml-2 cursor-pointer"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="">Name object</label>
              <TextInput
                id="element"
                type="text"
                // onChange={handleZoom}
                className="ml-2 cursor-pointer"
              />
            </div>
          </>
        )}
      </div>
      <div className="">
        <Button color="light" onClick={()=>editor?.downloadImage()}>
          Down Load Image
        </Button>
        <Button color="success" className="mt-5" onClick={()=>editor?.downloadJson()}>
          Down Load Json
        </Button>
        <Button color="dark" className="mt-5" onClick={downLoadImage}>
          Down Option
        </Button>
      </div>
    </div>
  );
};

export default BotOption;
