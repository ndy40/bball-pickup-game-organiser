import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { BiLoader } from "react-icons/bi";
import { Header, AuthStore } from "../features";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";
import { useAuth } from "../services/UserService";

const Router = () => {
  const [state, setState] = useRecoilState(AuthStore.state);
  const { data: response, isLoading, error } = useAuth();

  useEffect(() => {
    if (!error && response) {
      setState({ isLoggedIn: true, user: { ...response.data } });
    }
  }, [response, error, setState]);

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-800 text-white flex justify-center items-center text-6xl ">
        <BiLoader className="animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />

      {state.isLoggedIn ? <Authenticated /> : <UnAuthenticated />}
    </BrowserRouter>
  );
};

export default Router;
