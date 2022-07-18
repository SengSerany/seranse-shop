import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCartState } from '../../features/cart/cartSlice';
import { toast } from 'react-toastify';

function CartToasts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartSuccess, cartError, cartMessage } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (cartError) {
      toast.error(cartMessage);
    }

    if (cartSuccess) {
      if (cartMessage) {
        toast.success(cartMessage);
      }
    }

    if (cartError || cartSuccess) {
      dispatch(resetCartState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartError, cartSuccess]);
  return <div className="cartToast"></div>;
}

export default CartToasts;
