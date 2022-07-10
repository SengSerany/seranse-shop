import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { indexProducts } from '../../features/product/productSlice';

function InfosCharge() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (user.id !== null) {
      if (products === null) {
        dispatch(indexProducts());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
}

export default InfosCharge;
