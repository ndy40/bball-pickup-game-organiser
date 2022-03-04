import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../../context/auth/auth';

const menus = [
  {
    name: 'Home',
    link: '/events',
  },
  {
    name: 'Create Event',
    link: '/create',
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
                `${isActive ? 'text-red-600' : 'text-gray-600'} flex flex-col`
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            {menu.name}
          </NavLink>
        ))}
        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}
