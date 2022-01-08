import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import toast from "react-hot-toast";
import { AuthForm, IForm } from "./components";
import { register } from "../../services/UserService";

const Register = () => {
  const handleRegister = async (data: IForm) => {
    const { username } = data;
    try {
      const response = await register(username);
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
      <Text>Create an account</Text>
      <AuthForm btnText="Register" submitForm={handleRegister} />
    </PageContainer>
  );
};

export default Register;

const Text = styled.h2`
  ${tw`text-2xl capitalize text-center mb-5`}
`;

const PageContainer = styled.div`
  ${tw`w-full max-w-xs mx-auto mt-20  text-gray-700  `}
`;
