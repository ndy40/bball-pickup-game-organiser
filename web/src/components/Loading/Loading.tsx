import { BiLoader } from 'react-icons/bi';

function Loading() {
  return (
    <div className="h-screen bg-gray-800 text-white flex justify-center items-center text-6xl z-100 ">
      <BiLoader className="animate-spin" />
    </div>
  );
}

export default Loading;
