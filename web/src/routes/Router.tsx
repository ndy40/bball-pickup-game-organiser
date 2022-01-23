import React from "react";
import { BrowserRouter } from "react-router-dom";

<<<<<<< HEAD
import { useGetAuthUser, useUser } from "components/auth/hooks";
=======
import { useAuthHooks, useCheckSignedInUser } from "components/auth/hooks/useAuthHooks";
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";

const Router = () => {
<<<<<<< HEAD
  useGetAuthUser();
  const user = useUser();

  return <BrowserRouter>{user ? <Authenticated /> : <UnAuthenticated />}</BrowserRouter>;
=======
  useCheckSignedInUser();
  const { state } = useAuthHooks();

  return <BrowserRouter>{state.user ? <Authenticated /> : <UnAuthenticated />}</BrowserRouter>;
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
};

export default Router;
