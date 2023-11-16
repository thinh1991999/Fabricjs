import { useContext } from "react";
import { CreateTemplateContext } from "../../pages/CreateTemplate";
import { Button } from "flowbite-react";
import { defaultTexts } from "../../constants/canvas";

const SbText = () => {
  const editor = useContext(CreateTemplateContext).editor;

  return (
    <div>
      <div className="mt-10">
        <h3 className="mb-8">Text styles</h3>
        <div className="flex flex-wrap -m-2">
          {defaultTexts.map((vl, idx) => {
            return (
              <div className="p-2" key={idx}>
                <Button
                  size={vl.size}
                  className="text-md"
                  onClick={() => vl.function(editor, vl.title, vl.fontsize)}
                >
                  {vl.title}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SbText;
