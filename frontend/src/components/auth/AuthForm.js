import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { register } from '../../features/auth/authSlice';
import { FaChevronRight } from 'react-icons/fa';

function AuthForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.auth);
  const [dataForm, setDataForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { username, email, password, passwordConfirm } = dataForm;

  const submitButtonStyle = {
    '--pad-top_down': '12px',
    '--pad-left_right': '30px',
    '--cta_margin_custom': 'auto',
    '--clr-cta_shadow_custom': 'var(--clr-red)',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(dataForm));
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <div className="form-fields">
        <label className="ff-primary">Nom d'utilisateur</label>
        <input
          type="text"
          className="form-control"
          id="inputUsername"
          name="username"
          value={username}
          aria-describedby="usernameHelp"
          onChange={handleChange}
        />
      </div>
      <div className="form-fields">
        <label className="ff-primary">Adresse email</label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          name="email"
          value={email}
          aria-describedby="emailHelp"
          onChange={handleChange}
        />
      </div>
      <div className="form-fields">
        <label className="ff-primary">Mot de passe</label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className="form-fields">
        <label className="ff-primary">Confirmation du mot de passe</label>
        <input
          type="password"
          className="form-control"
          name="passwordConfirm"
          value={passwordConfirm}
          id="inputPasswordConfirm"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="flex cta cta-small ff-primary fs-400 text-white bg-strong_blue uppercase text-center"
        style={submitButtonStyle}
      >
        S'inscrire <FaChevronRight />
      </button>
    </form>
  );
}

export default AuthForm;
