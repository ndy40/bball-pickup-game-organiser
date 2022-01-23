import React from "react";
import { AuthForm } from "./AuthForm";
<<<<<<< HEAD
import { useRegister } from "./hooks";
=======
import { useRegister } from "./hooks/useAuthHooks";
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
import { Link } from "react-router-dom";

const Register = () => {
  const register = useRegister();
  return (
    <div className="min-h-screen flex flex-col items-center pt-40">
      <div className="text-center text-red-900 text-4xl mb-2">PICKUP GAMES</div>
      <AuthForm
        btnText="Register"
        heading="Create an account"
        submitForm={(data) => register(data.username)}
      />
      <div>
        <p className="text-xs tracking-wide">
          Already have an account? &nbsp;
          <Link to="/login" className="hover:text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
