import { useReducer, createContext } from "react";
import Sidebar from "../components/CreateTemplate/Sidebar";
import Center from "../components/CreateTemplate/Center";
import TopOption from "../components/CreateTemplate/TopOption";
import CreateTLReducer, { initValue } from "../store/CreateTLReducer";
import { useFabricJSEditor } from "../hooks/useFabricJSEditor";
import BotOption from "../components/CreateTemplate/BotOption";

export const CreateTemplateContext = createContext();

function CreateTemplate() {
  const [state, dispatch] = useReducer(CreateTLReducer, initValue);

  const { editor, onReady, selectedObjects } = useFabricJSEditor({
    defaultStrokeColor: "red",
  });
  console.log(selectedObjects);
  return (
    <CreateTemplateContext.Provider
      value={{ state, dispatch, editor, onReady, selectedObjects }}
    >
      <div className="">
        <div className="flex">
          <div className="">
            <Sidebar />
          </div>
          <div className="flex-1 bg-slate-200 transition-all duration-300 ease-linear flex flex-col">
            <TopOption />
            <div className="flex-1">
              <Center />
            </div>
            <BotOption />
          </div>
        </div>
      </div>
    </CreateTemplateContext.Provider>
  );
}

export default CreateTemplate;
