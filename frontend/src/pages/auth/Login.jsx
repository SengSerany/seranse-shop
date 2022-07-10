import { Link } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

function Login() {
  return (
    <div className="flex-column justify-content-center text-center">
      <h1 className="uppercase ff-primary fs-800">Se connecter</h1>
      <AuthForm />
      <Link
        to="/register"
        className="subheading-link uppercase ff-sans_cond fs-200 letter-spacing-2"
      >
        Je n'ai pas encore de compte
      </Link>
    </div>
  );
}

export default Login;
