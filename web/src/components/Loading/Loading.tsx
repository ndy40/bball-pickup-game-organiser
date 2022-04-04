import { BiLoader } from 'react-icons/bi';

function Loading() {
  return (
    <div className="z-100 flex h-screen items-center justify-center  text-3xl text-gray-600 ">
      <BiLoader className="animate-spin" />
    </div>
  );
}

export default Loading;
