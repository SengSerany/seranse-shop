import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetProductState } from '../../features/product/productSlice';
import { toast } from 'react-toastify';

function ProductToasts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productSuccess, productError, productMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (productError) {
      toast.error(productMessage);
    }

    if (productSuccess) {
      navigate('/');
      toast.success(productMessage);
    }

    if (productError || productSuccess) {
      dispatch(resetProductState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productError, productSuccess]);
  return <div className="productToast"></div>;
}

export default ProductToasts;
