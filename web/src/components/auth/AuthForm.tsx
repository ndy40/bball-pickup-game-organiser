import React from "react";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
=======

>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
import { Text, Form, Label, Input, FormGroup, Error, Button } from "uitls/GlobalStyles";

export interface IForm {
  username: string;
}

interface Props {
  btnText: string;
  submitForm: (data: IForm) => void;
  heading: string;
}

export const AuthForm: React.FC<Props> = ({ btnText, submitForm, heading }) => {
  const {
    register,
    handleSubmit,
<<<<<<< HEAD
=======

>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
    formState: { errors },
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
    submitForm(data);
  };

  return (
    <Container>
      <Text>{heading}</Text>
      <Form onSubmit={handleSubmit(onValid)}>
        <FormGroup>
          <Label>Username:</Label>
<<<<<<< HEAD
=======

>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username must be greater than 2 Characters",
              },
            })}
            data-testid="add-username"
          />
          <Error>{errors.username?.message}</Error>
        </FormGroup>
        <Button>{btnText}</Button>
      </Form>
    </Container>
  );
};

const Container = tw.div`
w-full max-w-xs mx-auto text-gray-700 
`;
