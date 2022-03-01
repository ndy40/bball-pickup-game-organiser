import AuthForm from 'components/auth/AuthForm';
import { useRegister } from 'hooks/auth';
import { Link } from 'react-router-dom';

function Register() {
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
}

export default Register;
