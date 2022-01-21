import React from "react";
import { BrowserRouter } from "react-router-dom";

import { useAuthHooks, useCheckSignedInUser } from "components/auth/hooks/useAuthHooks";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";

const Router = () => {
  useCheckSignedInUser();
  const { state } = useAuthHooks();

  return <BrowserRouter>{state.user ? <Authenticated /> : <UnAuthenticated />}</BrowserRouter>;
};

export default Router;
