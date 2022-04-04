/* eslint-disable react/no-unescaped-entities */
import AuthForm from 'components/auth/AuthForm';
import { useLogin } from 'hooks/auth';
import { Link } from 'react-router-dom';

function Login() {
  const login = useLogin();
  return (
    <div className="flex min-h-screen flex-col  pt-32">
      <h2 className="mb-2 text-center text-3xl text-red-700">PICKUP GAMES</h2>
      <AuthForm
        btnText="Login"
        heading="Login into your account"
        submitForm={(data) => login(data.username)}
      />
      <div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account? &nbsp;
          <Link to="/register" className="hover:text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
