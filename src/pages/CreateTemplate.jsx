import { useReducer, createContext, useRef } from "react";
import Sidebar from "../components/CreateTemplate/Sidebar";
import Center from "../components/CreateTemplate/Center";
import TopOption from "../components/TopOption";
import CreateTLReducer, { initValue } from "../store/CreateTLReducer";
import { useFabricJSEditor } from "../hooks/useFabricJSEditor";
import BotOption from "../components/BotOption";
import Layer from "../components/Layer";

export const CreateTemplateContext = createContext();

function CreateTemplate() {
  const [state, dispatch] = useReducer(CreateTLReducer, initValue);
  const layerRef = useRef();

  const layerRenders = () => {
    layerRef.current.renderLayers();
  };

  const { editor, onReady, selectedObjects } = useFabricJSEditor({
    defaultStrokeColor: "black",
    renderLayers: layerRenders,
  });
  console.log("CreateTemplate");
  return (
    <CreateTemplateContext.Provider
      value={{ state, dispatch, editor, onReady, selectedObjects }}
    >
      <div className="h-[800px] ">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 bg-slate-200 transition-all duration-300 ease-linear flex flex-col">
            <TopOption TemplateContext={CreateTemplateContext}/>
            <div className="h-full">
              <Center onReady={onReady}/>
            </div>
            <BotOption TemplateContext={CreateTemplateContext}/>
          </div>
          <div className="w-[400px]">
            <Layer ref={layerRef} TemplateContext={CreateTemplateContext}/>
          </div>
        </div>
      </div>
    </CreateTemplateContext.Provider>
  );
}

export default CreateTemplate;
