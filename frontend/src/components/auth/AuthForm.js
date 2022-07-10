import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { register, login } from '../../features/auth/authSlice';
import Spinner from '../../components/layout/Spinner';

function AuthForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.auth);
  const [pageTitle] = useState(
    location.pathname === '/register' ? 'Inscription' : 'Connection'
  );
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
    if (location.pathname === '/register') {
      dispatch(register(dataForm));
    } else if (location.pathname === '/login') {
      const data = {
        email,
        password,
      };
      dispatch(login(data));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      {location.pathname === '/register' && (
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
            required
          />
        </div>
      )}
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
          required
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
          required
        />
      </div>
      {location.pathname === '/register' && (
        <div className="form-fields">
          <label className="ff-primary">Confirmation du mot de passe</label>
          <input
            type="password"
            className="form-control"
            name="passwordConfirm"
            value={passwordConfirm}
            id="inputPasswordConfirm"
            onChange={handleChange}
            required
          />
        </div>
      )}
      <button
        type="submit"
        className="flex cta cta-small ff-primary fs-400 text-white bg-strong_blue uppercase text-center"
        style={submitButtonStyle}
      >
        {pageTitle}
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </form>
  );
}

export default AuthForm;
