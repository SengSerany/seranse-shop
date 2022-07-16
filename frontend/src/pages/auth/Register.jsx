import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';

function Register() {
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <div className="flex-column justify-content-center text-center">
      <h1 className="h1-title uppercase ff-primary fs-800">S'inscrire</h1>
      <AuthForm />
      {!isLoading && (
        <Link
          to="/login"
          className="subheading-link uppercase ff-sans_cond fs-200 letter-spacing-2"
        >
          J'ai déja un compte
        </Link>
      )}
    </div>
  );
}

export default Register;
