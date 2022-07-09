import FormAuth from '../../components/auth/FormAuth';

function Register() {
  return (
    <div className="flex-column justify-content-center text-center">
      <h1 className="uppercase ff-primary fs-800">S'inscrire</h1>
      <FormAuth />
    </div>
  );
}

export default Register;
