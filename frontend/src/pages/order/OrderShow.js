import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateOrder } from '../../features/order/orderSlice';
import OrderProductCard from '../../components/order/OrderProductCard';

function OrderShow() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders, adresses } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const currentOrder = orders ? orders.find((order) => order._id === id) : null;
  const currentAdress = adresses.find(
    (adress) => adress._id === currentOrder.adressID
  );
  const [orderStatus, setOrderStatus] = useState(
    currentOrder ? currentOrder.state : 'En attente'
  );
  const createProductButtonStyle = {
    '--btn-width': '16rem',
    margin: 'auto',
  };

  const handleChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      orderID: id,
      state: orderStatus,
    };
    dispatch(updateOrder(data));
  };

  return (
    <div>
      <h1 className="h1-title uppercase ff-primary fs-700 text-center">
        Commande :
        <br />
        {currentOrder && currentOrder._id}
      </h1>
      <div className="order-show">
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="form-fields">
            <label className="ff-sans_cond fs-300 fw-semi_bold">
              Statut de la commande :
            </label>
            <select
              className="ff-sans_cond fs-300 fw-semi_bold"
              name="state"
              required
              type="text"
              value={orderStatus}
              onChange={handleChange}
            >
              <option value="En attente">En attente</option>
              <option value="En préparation">En préparation</option>
              <option value="Envoyé">Envoyé</option>
              <option value="En livraison">En livraison</option>
              <option value="Livré">Livré</option>
            </select>
          </div>
          <button
            className="button-type bg-strong_blue text-white uppercase ff-sans_cond fs-200 letter-spacing-3 text-center"
            style={createProductButtonStyle}
          >
            Actualiser le statut
          </button>
        </form>
        <div className="order-show-section order-show_adress">
          <h2 className="h2-title uppercase ff-primary fs-600 text-center">
            Adresse de livraison
          </h2>
          {currentAdress && (
            <section className="order-adress">
              <p className="ff-sans_cond letter-spacing-2">
                {currentOrder.clientName}
              </p>
              <p className="ff-sans_cond letter-spacing-2">
                {currentAdress.street}
              </p>
              <p className="ff-sans_cond letter-spacing-2">
                {currentAdress.zipCode} {currentAdress.city}
              </p>
            </section>
          )}
        </div>
        <section className="order-show-section order-show_products">
          <h2 className="h2-title uppercase ff-primary fs-600 text-center">
            Produits
          </h2>
          {currentOrder &&
            currentOrder.products.map((product) => {
              const currentProduct = products.find(
                (productItem) => productItem._id === product.productID
              );
              return (
                <OrderProductCard
                  key={currentProduct._id}
                  product={currentProduct}
                  quantity={product.quantity}
                />
              );
            })}
        </section>
      </div>
    </div>
  );
}

export default OrderShow;
