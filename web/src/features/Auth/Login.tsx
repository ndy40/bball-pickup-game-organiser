import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import toast from "react-hot-toast";
import { AuthForm, IForm } from "./components";
import { login } from "../../services/UserService";

const Login = () => {
  const handleLogin = async (data: IForm) => {
    const { username } = data;
    try {
      const response = await login(username);
      if (response) {
        localStorage.setItem("token", response.data.access_token);
        window.location.replace("/");
      }
    } catch (error: any) {
      toast.error(error.response.data.detail);
    }
  };
  return (
    <PageContainer>
      <Text>Login into your account</Text>
      <AuthForm btnText="Login" submitForm={(username) => handleLogin(username)} />
    </PageContainer>
  );
};

export default Login;

const Text = styled.h2`
  ${tw`text-2xl capitalize text-center mb-5`}
`;
const PageContainer = styled.div`
  ${tw`w-full max-w-xs mx-auto mt-20  text-gray-700  `}
`;
