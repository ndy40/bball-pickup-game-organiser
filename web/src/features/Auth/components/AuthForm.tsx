import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useForm } from "react-hook-form";

export interface IForm {
  username: string;
}

interface Props {
  btnText: string;
  submitForm: (data: IForm) => void;
}

export const AuthForm: React.FC<Props> = ({ btnText, submitForm }) => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
    submitForm(data);
    setValue("username", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <FormGroup>
        <Label>Username:</Label>

        <Input
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 2,
              message: "Username must be greater than 2 Characters",
            },
          })}
        />
        <Error>{errors.username?.message}</Error>
      </FormGroup>
      <Button>{btnText}</Button>
    </Form>
  );
};

const Form = styled.form`
  ${tw`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`}
`;

const Input = styled.input`
  ${tw`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none `}
`;

const Label = styled.label`
  ${tw`block  text-sm font-bold mb-2`}
`;

const FormGroup = styled.div`
  ${tw`mb-4`}
`;

const Error = styled.span`
  ${tw`text-red-500 text-xs italic`}
`;

const Button = styled.button`
  ${tw` w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none `}
`;
