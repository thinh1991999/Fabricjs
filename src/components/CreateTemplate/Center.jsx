import { useContext } from "react";
import { CreateTemplateContext } from "../../pages/CreateTemplate";
import Canvas from "../Canvas";

const Center = () => {
  const onReady = useContext(CreateTemplateContext).onReady;
  return (
    <div className="">
      <Canvas onReady={onReady} />;
    </div>
  );
};

export default Center;
