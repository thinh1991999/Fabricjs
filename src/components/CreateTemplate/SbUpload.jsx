import { TextInput } from "flowbite-react";
import { useContext } from "react";
import { CreateTemplateContext } from "../../pages/CreateTemplate";

const SbUpload = () => {
  const editor = useContext(CreateTemplateContext).editor;

  const handleUploadImg = (e) => {
    const file = e.target.files[0];
    editor?.uploadImage(file);
    e.target.files = null;
  };
  return (
    <div>
      <TextInput
        id="upload"
        type="file"
        placeholder="Search elements"
        onChange={handleUploadImg}
      />
    </div>
  );
};

export default SbUpload;
