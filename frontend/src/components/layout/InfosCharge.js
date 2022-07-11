import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { indexProducts } from '../../features/product/productSlice';

function InfosCharge() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (products === null) {
      dispatch(indexProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
}

export default InfosCharge;
