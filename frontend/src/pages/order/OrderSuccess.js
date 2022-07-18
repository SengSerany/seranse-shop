import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <div>
      <h1 className="h1-title uppercase ff-primary fs-700 text-center">
        Commande validé !
      </h1>
      <br />
      <p className="text-center">
        Suivez la progression de vos commande dans votre page{' '}
        <Link to="/profile" className="fw-semi_bold text-red">
          Mon compte
        </Link>
      </p>
    </div>
  );
}

export default OrderSuccess;
