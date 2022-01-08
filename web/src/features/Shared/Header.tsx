import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Link } from "react-router-dom";
import tw from "twin.macro";

import { state as AuthState } from "../Auth/store";

const Header = () => {
  const authState = useRecoilValue(AuthState);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };
  return (
    <Navbar>
      <Container>
        <Col>
          <Logo to="/">BBall</Logo>
        </Col>
        <Col>
          {!authState.isLoggedIn ? (
            <>
              <Button to="/login">Login</Button>
              <Button to="/register">Sign Up</Button>
            </>
          ) : (
            <div className="flex items-center">
              <span>
                <img
                  src={authState.user?.avatar}
                  className="mr-2"
                  width="30"
                  height="30"
                  alt="profile_avatar"
                />
              </span>
              <Button as="button" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </Col>
      </Container>
    </Navbar>
  );
};

export default Header;

const Navbar = styled.header`
  ${tw`flex w-full  bg-blue-500  text-gray-100 `}
`;
const Logo = styled(Link)`
  ${tw`text-2xl capitalize font-bold `}
`;

const Button = styled(Link)`
  ${tw`border border-gray-100  py-1 px-3 rounded text-xs    `}
  &:hover {
    ${tw`bg-gray-100 text-gray-900 shadow-lg `}
  }
`;

const Col = styled.div`
  ${tw`space-x-2`}
`;
const Container = styled.div`
  ${tw` w-full h-full max-w-screen-lg mx-auto flex justify-between items-center px-2 py-3   `}
`;
