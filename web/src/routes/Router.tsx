import React from "react";
import { BrowserRouter } from "react-router-dom";

import { useGetAuthUser, useUser } from "components/auth/hooks";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";

const Router = () => {
  useGetAuthUser();
  const user = useUser();

  return <BrowserRouter>{user ? <Authenticated /> : <UnAuthenticated />}</BrowserRouter>;
};

export default Router;
