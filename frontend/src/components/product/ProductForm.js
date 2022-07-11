import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  createProduct,
  updateProduct,
} from '../../features/product/productSlice';
import { toast } from 'react-toastify';
import Spinner from '../layout/Spinner';

function ProductForm({ product = null }) {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { productLoading } = useSelector((state) => state.product);
  const [pageTitle] = useState(
    location.pathname.endsWith('new') ? 'Créer' : 'Modifier'
  );
  const [selectedImage, setSelectedImage] = useState(
    location.pathname.endsWith('new') ? null : product.image
  );
  const [dataForm, setDataForm] = useState({
    image: location.pathname.endsWith('new') ? '' : product.image,
    productName: location.pathname.endsWith('new') ? '' : product.productName,
    price: location.pathname.endsWith('new') ? '' : product.price,
    description: location.pathname.endsWith('new') ? '' : product.description,
  });
  const { image, productName, price, description } = dataForm;

  const submitButtonStyle = {
    '--pad-top_down': '12px',
    '--pad-left_right': '30px',
    '--cta_margin_custom': 'auto',
    '--clr-cta_shadow_custom': 'var(--clr-red)',
    paddingLeft: location.pathname.endsWith('new') ? '48px' : '35px',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'image') {
      previewImage(e.target.files[0]);
      setDataForm((prevDataState) => {
        return {
          ...prevDataState,
          [name]: value,
        };
      });
    } else {
      setDataForm((prevDataState) => {
        return {
          ...prevDataState,
          [name]: value,
        };
      });
    }
  };

  const previewImage = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !selectedImage.startsWith('data:image/jpeg') &&
      !selectedImage.startsWith('data:image/png')
    ) {
      if (!location.pathname.endsWith('edit') && !image === '') {
        toast.error("L'image ajouté doit être du format jpeg or png");
        return;
      }
    }

    const data = {
      image:
        location.pathname.endsWith('edit') && image === ''
          ? product.image
          : selectedImage,
      productName,
      price: parseInt(price),
      description,
      productId: params.id,
    };

    if (location.pathname.endsWith('new')) {
      dispatch(createProduct(data));
    } else if (location.pathname.endsWith('edit')) {
      dispatch(updateProduct(data));
    }
  };

  if (productLoading) {
    return <Spinner />;
  }

  const log = (e) => {
    console.log(dataForm);
  };

  return (
    <>
      <button onClick={log}>LOG</button>
      <div className="box-img-selected flex justify-content-center">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="New product"
            className="image-selected"
          />
        )}
      </div>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-fields">
          <label className="ff-primary">Image</label>
          {location.pathname.endsWith('edit') ? (
            <input name="image" type="file" onChange={handleChange} />
          ) : (
            <input required name="image" type="file" onChange={handleChange} />
          )}
        </div>
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
    </>
  );
}

export default ProductForm;
