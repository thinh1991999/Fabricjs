import { memo, useState } from "react";
import { createTLSideData } from "../../config";

const SubSideWrap = ({ children, isShowSub, setIsShowSub }) => {
  return (
    <div
      className={`${
        isShowSub ? "w-[300px] p-10" : "w-0 p-0 overflow-hidden"
      } text-white   relative bg-[#252627] transition-all ease-linear duration-100 z-10`}
    >
      {children}
      <button
        onClick={() => setIsShowSub(false)}
        className="bg-black absolute -right-4 top-1/2 translate-x-1/2"
      >
        Close
      </button>
    </div>
  );
};

const Sidebar = () => {
  const [option, setOption] = useState();
  const [subside, setSubside] = useState();
  const [isShowSub, setIsShowSub] = useState(false);

  const handleChangeOption = (vl) => {
    setOption(vl.hint);
    setSubside(vl.child);
    setIsShowSub(true);
  };
  console.log(subside);
  return (
    <div className="flex">
      <ul className="bg-[#18181A] text-gray-400 w-[100px]">
        {createTLSideData.map((vl) => {
          const { title, icon, hint } = vl;
          return (
            <li
              className={`${
                hint === option && isShowSub ? "bg-[#252627] text-white" : ""
              } flex flex-col items-center py-8 cursor-pointer hover:text-white`}
              key={hint}
              onClick={() => handleChangeOption(vl)}
            >
              {icon} {title}
            </li>
          );
        })}
      </ul>
      <SubSideWrap setIsShowSub={setIsShowSub} isShowSub={isShowSub}>
        {subside}
      </SubSideWrap>
    </div>
  );
};

export default memo(Sidebar);
