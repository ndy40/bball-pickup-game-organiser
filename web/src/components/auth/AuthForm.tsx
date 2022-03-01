/* eslint-disable import/no-extraneous-dependencies */
import tw from 'tailwind-styled-components';
import { useForm } from 'react-hook-form';
import {
  Text,
  Form,
  Label,
  Input,
  FormGroup,
  Error,
  Button,
} from 'utilities/GlobalStyles';

const Container = tw.div`
w-full max-w-xs mx-auto text-gray-700
`;

export interface IForm {
  username: string;
}

interface Props {
  btnText: string;
  submitForm: (data: IForm) => void;
  heading: string;
}

export default function AuthForm({ btnText, submitForm, heading }: Props) {
  const {
    register,
    handleSubmit,
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
          <Input
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 2,
                message: 'Username must be greater than 2 Characters',
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
}
