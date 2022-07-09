import { FaChevronRight } from 'react-icons/fa';

function FormAuth() {
  const submitButtonStyle = {
    '--pad-top_down': '12px',
    '--pad-left_right': '30px',
    '--cta_margin_custom': 'auto',
    '--clr-cta_shadow_custom': 'var(--clr-red)',
  };

  return (
    <form className="form-group">
      <div className="form-fields">
        <label className="ff-primary">Nom d'utilisateur</label>
        <input
          type="text"
          className="form-control"
          id="inputUsername"
          aria-describedby="usernameHelp"
        />
      </div>
      <div className="form-fields">
        <label className="ff-primary">Adresse email</label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="form-fields">
        <label className="ff-primary">Mot de passe</label>
        <input type="password" className="form-control" id="inputPassword" />
      </div>
      <div className="form-fields">
        <label className="ff-primary">Confirmation du mot de passe</label>
        <input
          type="password"
          className="form-control"
          id="inputPasswordConfirm"
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

export default FormAuth;
