import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { templatesData } from "../../data";
import { fakeCallApi } from "../../utils";

const LeftSide = ({editor,setCurrOptions}) => {
  const [templates, setTemplates] = useState([]);
  console.log('LeftSide');
  const loadTemplateIntoCanvas=(temp)=>{
    editor?.loadCanvasFromJson(JSON.stringify(temp.canvasObj));
    setCurrOptions(temp.options)
  }

  useEffect(() => {
    const getTemplates = () => {
      return templatesData;
    };

    const fetchTemplates = async () => {
      const data = await fakeCallApi(2000, getTemplates);
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  return (
    <div>
      <h3 className="mb-4">Templates</h3>
      <div className="flex">
        <Dropdown label="Dropdown" dismissOnClick={false}>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <div className="ml-10">
          <Dropdown label="1920*1089" dismissOnClick={false}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <ul className="mt-10 flex flex-wrap">
        {templates.map((temp, idx) => {
          return (
            <li key={idx} className="cursor-pointer" onClick={()=>loadTemplateIntoCanvas(temp)}>
              <img src={temp.img} alt="" className="max-w-[200px]" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSide;
