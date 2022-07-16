import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetOrderState } from '../../features/order/orderSlice';
import { toast } from 'react-toastify';

function OrderToasts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderSuccess, orderError, orderMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (orderError) {
      toast.error(orderMessage);
    }

    if (orderSuccess) {
      navigate('/admin/orders');
      toast.success(orderMessage);
    }

    if (orderError || orderSuccess) {
      dispatch(resetOrderState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderError, orderSuccess]);
  return <div className="orderToast"></div>;
}

export default OrderToasts;
