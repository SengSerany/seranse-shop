import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/product/ProductForm';
import Spinner from '../../components/layout/Spinner';

function ProductEdit() {
  const { id } = useParams();
  const { products, productLoading } = useSelector((state) => state.product);
  const currentProduct = products.find((product) => product._id === id);

  if (productLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="uppercase ff-primary fs-700 text-center">
        Modifier {currentProduct.productName}
      </h1>
      <ProductForm product={currentProduct} />
    </div>
  );
}

export default ProductEdit;
