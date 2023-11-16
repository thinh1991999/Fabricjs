import { useContext, useMemo } from "react";
import { CreateTemplateContext } from "../../pages/CreateTemplate";
import TextBuilder from "../TextBuilder";
import { canvasTypes } from "../../constants/canvas";
import ShapeBuilder from "../ShapeBuilder";

const TopOption = () => {
  const selectedObjects = useContext(CreateTemplateContext).selectedObjects;
  const editor = useContext(CreateTemplateContext).editor;

  const renderOptions = useMemo(() => {
    if (selectedObjects.length < 1) return <></>;
    const selectedObject = selectedObjects[0];
    const type = selectedObject.get("type");
    switch (type) {
      case canvasTypes.TEXT:
        return <TextBuilder selectedObject={selectedObject} editor={editor} />;
      case canvasTypes.CIRCLE:
      case canvasTypes.RECT:
        return <ShapeBuilder selectedObject={selectedObject} editor={editor} />;
      default:
        break;
    }
  }, [selectedObjects, editor]);

  return <div className="py-2 bg-white border-b-2">{renderOptions}</div>;
};

export default TopOption;
