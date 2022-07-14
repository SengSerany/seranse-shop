import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { indexProducts } from '../../features/product/productSlice';
import { getMyCart } from '../../features/cart/cartSlice';

function InfosCharge() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const { productsInCart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (products === null) {
      dispatch(indexProducts());
    }
    if (productsInCart === null) {
      dispatch(getMyCart());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return <div></div>;
}

export default InfosCharge;
