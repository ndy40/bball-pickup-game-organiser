import React from "react";
import { BiLoader } from "react-icons/bi";
import { useIsFetching } from "react-query";

const Loading = () => {
  const isLoading = useIsFetching();
  if (!isLoading) return <></>;
  return (
    <div className="h-screen bg-gray-800 text-white flex justify-center items-center text-6xl z-100 ">
      <BiLoader className="animate-spin" />
    </div>
  );
};

export default Loading;
