import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  createProduct,
  updateProduct,
} from '../../features/product/productSlice';
import Spinner from '../layout/Spinner';

function ProductForm({ product = null }) {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { productLoading } = useSelector((state) => state.product);
  const [pageTitle] = useState(
    location.pathname.endsWith('new') ? 'Créer' : 'Modifier'
  );
  const [dataForm, setDataForm] = useState({
    productName: location.pathname.endsWith('new') ? '' : product.productName,
    price: location.pathname.endsWith('new') ? '' : product.price,
    description: location.pathname.endsWith('new') ? '' : product.description,
  });
  const { productName, price, description } = dataForm;

  const submitButtonStyle = {
    '--pad-top_down': '12px',
    '--pad-left_right': '30px',
    '--cta_margin_custom': 'auto',
    '--clr-cta_shadow_custom': 'var(--clr-red)',
    paddingLeft: location.pathname.endsWith('new') ? '48px' : '35px',
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
    if (location.pathname.endsWith('new')) {
      const data = {
        productName,
        price: parseInt(price),
        description,
      };
      dispatch(createProduct(data));
    } else if (location.pathname.endsWith('edit')) {
      const data = {
        productName,
        price: parseInt(price),
        description,
        productId: params.id,
      };
      dispatch(updateProduct(data));
    }
  };

  if (productLoading) {
    return <Spinner />;
  }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <div className="form-fields">
        <label className="ff-primary">Nom du produit</label>
        <input
          type="text"
          className="form-control"
          id="inputUsername"
          name="productName"
          value={productName}
          aria-describedby="productNameHelp"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-fields">
        <label className="ff-primary">Prix</label>
        <input
          type="Number"
          min={0}
          step="0.01"
          className="form-control"
          id="inputPrice"
          name="price"
          value={price}
          aria-describedby="emailHelp"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-fields">
        <label className="ff-primary">Description</label>
        <textarea
          className="form-control"
          id="inputDescription"
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
      </div>
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

export default ProductForm;
