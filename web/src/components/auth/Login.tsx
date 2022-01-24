import React from "react";
import { AuthForm } from "./AuthForm";
import { useLogin } from "./hooks";
import { Link } from "react-router-dom";

const Login = () => {
  const login = useLogin();
  return (
    <div className="min-h-screen flex flex-col items-center pt-40">
      <div className="text-center text-red-900 text-4xl mb-2">PICKUP GAMES</div>
      <AuthForm
        btnText="Login"
        heading="Login into your account"
        submitForm={(data) => login(data.username)}
      />
      <div>
        <p className="text-xs tracking-wide">
          Don't have an account? &nbsp;
          <Link to="/register" className="hover:text-red-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
