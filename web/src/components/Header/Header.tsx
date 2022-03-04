import { Link } from 'react-router-dom';
import { useUser } from '../../context/auth/auth';

export default function Header() {
  const { user } = useUser();
  return (
    <div className="oveflow-hidden fixed top-0 left-0 right-0 h-14 w-full ">
      <div className="w-full ">
        <header className="relative z-0 flex w-full items-center justify-between bg-gray-800 p-3 text-white ">
          <Link to="/events" className=" text-2xl">
            Pickup Game
          </Link>
          <span className="block px-2 text-lg  font-bold text-white">
            <img src={user?.avatar} className="h-10 w-10" alt="avatar" />
          </span>
        </header>
      </div>
    </div>
  );
}
