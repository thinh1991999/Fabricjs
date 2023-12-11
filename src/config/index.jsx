import {
  FaShapes,
  FaPencilAlt,
  FaImages,
  FaRegFileVideo,
} from "react-icons/fa";
import { PiTextT } from "react-icons/pi";
import SbElement from "../components/CreateTemplate/SbElement";
import SbText from "../components/CreateTemplate/SbText";
import SbImageUpload from "../components/CreateTemplate/SbImageUpload";
import SbVideoUpload from "../components/CreateTemplate/SbVideoUpload";

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
    hint: "image",
    title: "Images",
    icon: <FaImages />,
    child: <SbImageUpload />,
  },
  {
    hint: "video",
    title: "Videos",
    icon: <FaRegFileVideo />,
    child: <SbVideoUpload />,
  },
  {
    hint: "draw",
    title: "Draw",
    icon: <FaPencilAlt />,
    child: ElementData,
  },
];
