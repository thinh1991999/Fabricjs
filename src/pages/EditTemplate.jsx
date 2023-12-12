import { useReducer, createContext, useRef, useState } from "react";
// import { fabric } from "fabric";
// import { useEffect } from "react";
// import TextBuilder from "../components/TextBuilder";
import LeftSide from "../components/EditTemplate/LeftSide";
import RightSide from "../components/EditTemplate/RightSide";
import Center from "../components/EditTemplate/Center";
import EditTLReducer, { initValue } from "../store/EditTLReducer";
import { useFabricJSEditor } from "../hooks/useFabricJSEditor";
import LayerContainer from "../components/Layer";
import BotOption from "../components/BotOption";
import TopOption from "../components/TopOption";

const EditTemplateContext = createContext();

function EditTemplate() {
  const [state, dispatch] = useReducer(EditTLReducer, initValue);
  const [currOptions,setCurrOptions]=useState(null);

  const layerRef = useRef();
  const layerRenders = () => {
    // layerRef.current.renderLayers();
  };

  const { editor, onReady, selectedObjects } = useFabricJSEditor({
    defaultStrokeColor: "black",
    renderLayers: layerRenders,
  });

  return (
    <EditTemplateContext.Provider value={{ state,currOptions,setCurrOptions, dispatch, editor, onReady, selectedObjects }}>
      <div className="h-[800px] ">
        <div className="flex h-full">
          <LeftSide setCurrOptions={setCurrOptions} editor={editor}/>
          <div className="flex-1 bg-slate-200 transition-all duration-300 ease-linear flex flex-col">
            <TopOption TemplateContext={EditTemplateContext}/>
            <div className="h-full">
              <Center onReady={onReady}/>
            </div>
            {/* <BotOption TemplateContext={EditTemplateContext}/> */}
          </div>
          <div className="w-[400px]">
            <RightSide currOptions={currOptions} editor={editor}/>
          </div>
        </div>
      </div>
    </EditTemplateContext.Provider>
  );
}

export default EditTemplate;
