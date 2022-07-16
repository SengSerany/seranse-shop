import { useSelector } from 'react-redux';
import OrderCard from '../../components/order/OrderCard';

function OrderIndex() {
  const { orders } = useSelector((state) => state.order);
  return (
    <div>
      <h1 className="h1-title uppercase ff-primary fs-700 text-center">
        Les commandes
      </h1>
      <div className="order-index">
        {orders &&
          orders.map((order) => <OrderCard key={order._id} order={order} />)}
      </div>
    </div>
  );
}

export default OrderIndex;
