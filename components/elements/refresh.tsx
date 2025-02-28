'use client';
import { MdOutlineRefresh } from "react-icons/md";
import React from "react";

const Refresh = ({ data }: { data?: string }) => {
  const refreshfun = () => {
    window.location.reload();
  };
  return (
    <div className=" w-full flex items-center justify-center text-xl gap-10 mt-10 flex-col">
      <h1>{data}</h1>
      <button onClick={() => refreshfun()} className=" buttonbg px-9 py-2 text-2xl">
        <MdOutlineRefresh size={25} />
      </button>
    </div>
  );
};

export default Refresh;
