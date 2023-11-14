import { TextInput } from "flowbite-react";
import { useState } from "react";

const BotOption = () => {
  const [zoom, setZoom] = useState(1);
  return (
    <div className="py-2 bg-white border-t-2">
      <div className="flex items-center">
        <TextInput
          id="element"
          type="range"
          value={zoom}
          min={1}
          max={500}
          step={1}
          onChange={(e) => {
            setZoom(e.target.value);
          }}
        />
        <span className="ml-2 font-light">{zoom}%</span>
      </div>
    </div>
  );
};

export default BotOption;
