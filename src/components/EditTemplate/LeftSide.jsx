import { Dropdown } from "flowbite-react";

const LeftSide = () => {
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
      <div className="flex flex-wrap">1</div>
    </div>
  );
};

export default LeftSide;
