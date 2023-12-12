import { Button, TextInput } from "flowbite-react";
import { useContext, useMemo, useState } from "react";
// import { CreateTemplateContext } from "../pages/CreateTemplate";
import { canvasTypes } from "../constants/canvas";
import { toggleEditableImage, toggleEditableShape, toggleEditableText } from "../store/action";
import localStorageService from "../service/localstore";

const BotOption = ({TemplateContext}) => {
  const [zoom, setZoom] = useState(100);
  const editor = useContext(TemplateContext).editor;
  const selectedObjects = useContext(TemplateContext).selectedObjects;
  const state = useContext(TemplateContext).state;
  const dispatch = useContext(TemplateContext).dispatch;
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

  const uploadTemplate = () => {
    const obj = {
      options: { ...state },
      img: editor?.getImage(),
      canvasObj: editor?.getJson(),
    };
    console.log(obj);
    const currTemplates=localStorageService.templateService.get();
    localStorageService.templateService.set([obj,...currTemplates]);
  };
  console.log(selectedObjects[0]);
  const isEditable = useMemo(() => {
    if (selectedObjects.length < 1 || !state) return;
    const checkIsEditable = (arr, idx) => {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element.id === idx) return true;
      }
      return false;
    };
    const id = selectedObjects[0].id;
    const type = selectedObjects[0].get("type");
    console.log(id, type);
    const { editableTexts, editableImages, editableBackgrounds } = state;
    switch (type) {
      case canvasTypes.CIRCLE:
      case canvasTypes.RECT:
        return checkIsEditable(editableBackgrounds, id);
      case canvasTypes.TEXT:
        return checkIsEditable(editableTexts, id);
      case canvasTypes.IMAGE:
        return checkIsEditable(editableImages, id);
      default:
        return false;
    }
  }, [selectedObjects, state]);

  const handleSetEditable = () => {
    const id = selectedObjects[0].id;
    const name = selectedObjects[0].name;
    switch (selectedObjects[0].get("type")) {
      case canvasTypes.CIRCLE:
      case canvasTypes.RECT:
        dispatch(toggleEditableShape({ id, name }));
        break;
      case canvasTypes.TEXT:
        dispatch(toggleEditableText({ id, name }));
        break;
      case canvasTypes.IMAGE:
        dispatch(toggleEditableImage({ id, name }));
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
          </>
        )}
      </div>
      <div className="">
        <Button color="light" onClick={() => editor?.downloadImage()}>
          Down Load Image
        </Button>
        <Button
          color="success"
          className="mt-5"
          onClick={() => editor?.downloadJson()}
        >
          Down Load Json
        </Button>
        <Button color="dark" className="mt-5" onClick={uploadTemplate}>
          Upload Template
        </Button>
      </div>
    </div>
  );
};

export default BotOption;
