import AuthForm from '../../components/auth/AuthForm';

function Register() {
  return (
    <div className="flex-column justify-content-center text-center">
      <h1 className="uppercase ff-primary fs-800">S'inscrire</h1>
      <AuthForm />
    </div>
  );
}

export default Register;
