import { useForm } from 'react-hook-form';

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
    formState: { errors, isValid },
  } = useForm<IForm>({ mode: 'onChange' });

  const onValid = (data: IForm) => {
    submitForm(data);
  };

  return (
    <>
      <p className="mb-4 text-center  font-semibold text-gray-900">{heading}</p>
      <form
        className="mx-auto flex w-full max-w-sm flex-col  px-2"
        onSubmit={handleSubmit(onValid)}
      >
        <label htmlFor="username" className="label">
          Username:
        </label>
        <div>
          <input
            className="input"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 2,
                message: 'Username must be greater than 2 Characters',
              },
            })}
            placeholder="Enter username"
          />
          <span className="error">{errors.username?.message}</span>
        </div>

        <button
          disabled={!isValid}
          type="submit"
          className="btn btn-primary mt-4"
        >
          {btnText}
        </button>
      </form>
    </>
  );
}
