import AuthForm from 'components/auth/AuthForm';
import { useRegister } from 'hooks/auth';
import { Link } from 'react-router-dom';

function Register() {
  const register = useRegister();
  return (
    <div className="flex min-h-screen flex-col  pt-32">
      <h2 className="mb-2 text-center text-3xl text-red-700">PICKUP GAMES</h2>
      <AuthForm
        btnText="Create account"
        heading="Create an account"
        submitForm={(data) => register(data.username)}
      />
      <div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account? &nbsp;
          <Link to="/login" className="hover:text-blue-500 hover:underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
