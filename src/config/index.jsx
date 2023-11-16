import { FaShapes, FaCloudUploadAlt, FaPencilAlt } from "react-icons/fa";
import { PiTextT } from "react-icons/pi";
import SbElement from "../components/CreateTemplate/SbElement";
import SbText from "../components/CreateTemplate/SbText";
import SbUpload from "../components/CreateTemplate/SbUpload";

const ElementData = [];

export const createTLSideData = [
  {
    hint: "element",
    title: "Elements",
    icon: <FaShapes />,
    child: <SbElement />,
  },
  {
    hint: "text",
    title: "Text",
    icon: <PiTextT />,
    child: <SbText />,
  },
  {
    hint: "upload",
    title: "Uploads",
    icon: <FaCloudUploadAlt />,
    child: <SbUpload />,
  },
  {
    hint: "draw",
    title: "Draw",
    icon: <FaPencilAlt />,
    child: ElementData,
  },
];
