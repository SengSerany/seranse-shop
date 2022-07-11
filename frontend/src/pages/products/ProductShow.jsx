import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteProduct } from '../../features/product/productSlice';

function ProductShow() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const currentProduct = products.find((product) => product._id === id);

  const createProductButtonStyle1 = {
    '--btn-width': '16rem',
    margin: 'auto 0.1rem',
  };

  const createProductButtonStyle2 = {
    '--btn-width': '16rem',
    '--btn-shadow-clr-custom': 'var(--clr-strong_blue)',
    margin: 'auto 0.1rem',
  };

  return (
    <div className="product-show-page flex-column justify-content-center">
      <h1 className="uppercase ff-primary fs-700 text-center">
        {currentProduct && currentProduct.productName}
      </h1>
      {user.id !== null && (
        <div className="flex justify-content-center">
          <Link
            to={`/products/${id}/edit`}
            className="button-type bg-strong_blue text-white uppercase ff-sans_cond fs-200 letter-spacing-3 text-center"
            style={createProductButtonStyle1}
          >
            Modifier le produit
          </Link>
          <button
            className="button-type bg-red text-white uppercase ff-sans_cond fs-200 letter-spacing-3 text-center"
            onClick={() => {
              dispatch(deleteProduct(id));
            }}
            style={createProductButtonStyle2}
          >
            Supprimer le produit
          </button>
        </div>
      )}
      <p>{currentProduct && currentProduct.description}</p>
      <p className="uppercase ff-sans_cond fs-400 fw-semi_bold">
        {currentProduct && currentProduct.price}€
      </p>
    </div>
  );
}

export default ProductShow;
