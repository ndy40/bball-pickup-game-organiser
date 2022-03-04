import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../../context/auth/auth';
import { HomeIcon, PlusIcon, LogoutIcon } from '@heroicons/react/outline';

const menus = [
  {
    name: 'Events',
    link: '/events',
    Icon: HomeIcon,
  },
  {
    name: 'Create Event',
    link: '/create',
    Icon: PlusIcon,
  },
];

export default function Footer() {
  const { logout } = useUser();
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 w-full border-t border-gray-100 bg-white text-xs shadow">
      <div className="flex h-full w-full items-center justify-evenly">
        {menus.map((menu) => (
          <NavLink
            to={menu.link}
            key={uuidv4()}
            className={
              ({ isActive }) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                `${
                  isActive ? 'text-red-600' : 'text-gray-400'
                } flex flex-col items-center justify-center space-y-2`
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            <menu.Icon className="w-6" />
            {menu.name}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={() => logout()}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <LogoutIcon className="w-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
