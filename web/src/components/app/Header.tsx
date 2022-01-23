import React, { useState } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
<<<<<<< HEAD
import { useUser, useLogout } from "components/auth/hooks";
=======
import { useAuthHooks } from "components/auth/hooks/useAuthHooks";
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
import { BiMenu, BiChevronLeft } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const menus = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Create Event",
    link: "/create-event",
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
<<<<<<< HEAD
  const user = useUser();
  const location = useLocation();
  const logout = useLogout();
=======
  const { state: authState, logout } = useAuthHooks();
  const location = useLocation();
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
  const toggleModal = () => setOpen((prev) => !prev);

  return (
    <Container className="h-full">
      <SideBar open={open}>
        <div className="flex justify-between">
          <span className="font-bold text-sm px-3">
<<<<<<< HEAD
            <img src={user?.avatar} width="50" alt="" />
=======
            <img src={authState.user?.avatar} width="50" alt="" />
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
          </span>
          <BiChevronLeft
            onClick={toggleModal}
            className="text-5xl p-2 hover:bg-gray-700 cursor-pointer rounded-full "
          />
        </div>
        <ul className="mt-8 space-y-3">
          {menus.map((menu, index) => (
            <li
              className={`block ${
                location.pathname === menu.link ? "bg-gray-800" : null
              } py-2 rounded-md`}
              key={index}
            >
              <Link to={menu.link} className="px-4 py-2  rounded-md " onClick={toggleModal}>
                {menu.name}
              </Link>
            </li>
          ))}
<<<<<<< HEAD
=======

>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
          <hr />
          <li className="block   py-2">
            <button className="px-4 py-2  rounded-md " onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </SideBar>
      <div className="w-full ">
        <header className="bg-gray-800 relative z-0 w-full flex items-center p-1 justify-between py-2 ">
          <div className="p-1 hover:bg-gray-700 rounded-full">
            <BiMenu
              onClick={toggleModal}
              className="text-4xl    text-white cursor-pointer rounded-full "
            />
          </div>
<<<<<<< HEAD
          <span className="block text-lg text-white  font-bold px-2">{user?.username}</span>
=======
          <span className="block text-lg text-white  font-bold px-2">
            {authState.user?.username}
          </span>
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
        </header>
      </div>
    </Container>
  );
};

export default Header;

const Container = tw.div`
 h-full
`;
<<<<<<< HEAD
const SideBar = tw.div<{ open: boolean }>`
  ${(props) => (props.open ? "translate-x-0" : "-translate-x-full")}
  absolute inset-0  transform ease-in-out duration-100 z-10 w-48 bg-gray-900 text-white h-full min-h-screen p-3
=======

const SideBar = tw.div<{ open: boolean }>`
  ${(props) => (props.open ? "translate-x-0" : "-translate-x-full")}
  absolute inset-0  transform ease-in-out duration-100 z-10 w-48 bg-gray-900 text-white h-full min-h-screen p-3
  
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
`;
