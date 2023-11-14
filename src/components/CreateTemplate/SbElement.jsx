import { Button, TextInput } from "flowbite-react";
import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { shapes } from "../../constants/canvas";
import { CreateTemplateContext } from "../../pages/CreateTemplate";
const SbElement = () => {
  const editor = useContext(CreateTemplateContext).editor;
  console.log(editor);
  return (
    <div>
      <TextInput
        icon={BsSearch}
        id="element"
        type="text"
        placeholder="Search elements"
      />
      <div className="mt-10">
        <h3 className="mb-8">Shapes</h3>
        <div className="flex flex-wrap -m-2">
          {shapes.map((shape, idx) => {
            return (
              <div className="p-2" key={idx}>
                <Button onClick={() => shape.function(editor)}>
                  {shape.title}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SbElement;
