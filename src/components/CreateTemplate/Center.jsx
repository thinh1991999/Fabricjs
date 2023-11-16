import { useContext } from "react";
import { CreateTemplateContext } from "../../pages/CreateTemplate";
import Canvas from "../Canvas";

const Center = () => {
  const onReady = useContext(CreateTemplateContext).onReady;
  return <Canvas onReady={onReady} />;
};

export default Center;
