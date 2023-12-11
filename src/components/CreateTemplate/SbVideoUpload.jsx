import { TextInput, Button } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { CreateTemplateContext } from "../../pages/CreateTemplate";
import { fakeCallApi, getImageBase64 } from "../../utils";
import localStorageService from "../../service/localstore";

const SbVideoUpload = () => {
  const editor = useContext(CreateTemplateContext).editor;
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleUploadVideo = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleChooseImg = (img) => {
    editor?.uploadImage(img);
  };

  useEffect(() => {
    const getImagesLocal = () => {
      return localStorageService.imagesService.get();
    };
    const fetchImages = async () => {
      setIsLoading(true);
      const imagesR = await fakeCallApi(1000, getImagesLocal);
      setImages((prev) => [...prev, ...imagesR]);
      setIsLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <TextInput
        id="upload"
        type="file"
        placeholder="Search elements"
        onChange={handleUploadVideo}
      />
      {isLoading ? (
        <span>Loading....</span>
      ) : (
        <ul className="overflow-auto flex-1">
          {images.map((img, idx) => {
            return (
              <li key={idx} className="border">
                <img src={img.src} alt="" />
                <Button onClick={() => handleChooseImg(img)}>Upload</Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SbVideoUpload;
