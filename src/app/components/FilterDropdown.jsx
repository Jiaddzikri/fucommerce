"use client";

import { useState } from "react";

const FilterDropdown = ({ children, text }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="border-b-[1px] border-slate-300 ">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setActive((prev) => !prev)}
          className="py-2 px-3 w-full h-full flex justify-between items-center"
        >
          <span className="font-semibold text-md">{text}</span>
          <span
            className="transition-all p-1 flex justify-center items-center rounded-full"
            style={{
              transform: `rotate(${active === true ? 180 : 0}deg)`,
            }}
          >
            <ion-icon name="chevron-down-outline"></ion-icon>
          </span>
        </button>
      </div>
      <div
        className={`${
          active === true ? "block" : "hidden"
        } w-full h-max px-3 py-1 text-slate-500`}
      >
        {children}
      </div>
    </div>
  );
};
export default FilterDropdown;
