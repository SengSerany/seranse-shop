import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductIndexCard from '../../components/product/ProductIndexCard';
import InfosCharge from '../../components/layout/InfosCharge';
import Spinner from '../../components/layout/Spinner';

function ProductsIndex() {
  const { products, productLoading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const createProductButtonStyle = {
    '--btn-width': '16rem',
    margin: 'auto',
  };

  if (productLoading) {
    return <Spinner />;
  }

  return (
    <>
      <InfosCharge />
      <div className="flex-column justify-content-center">
        <h1 className="uppercase ff-primary fs-700 text-center">
          Seranse shop
        </h1>
        {user.id !== null && (
          <Link
            to="/products/new"
            className="button-type bg-strong_blue text-white uppercase ff-sans_cond fs-200 letter-spacing-3 text-center"
            style={createProductButtonStyle}
          >
            Ajouter un produit
          </Link>
        )}

        {products === null ? <Spinner /> : null}

        <div className="products-board flex justify-content-center">
          {products !== null && products.length > 0 ? (
            products.map((productInfos) => (
              <ProductIndexCard key={productInfos._id} product={productInfos} />
            ))
          ) : (
            <div className="flex-column text-center">
              <p>Il y a 0 article pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductsIndex;
