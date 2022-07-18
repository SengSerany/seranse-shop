import { useSelector } from 'react-redux';
import OrderForm from '../../components/order/OrderForm';

function OrderCreate() {
  const { productsInCart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);

  const calcCartTotal = () => {
    let total = 0;
    productsInCart.forEach((linkProduct) => {
      const currentProduct = products.find(
        (product) => product._id === linkProduct.productID
      );
      total += currentProduct.price * linkProduct.quantity;
    });
    return total;
  };

  const arrayOfProductsID = () => {
    const array = [];
    productsInCart.forEach((linkProduct) => {
      array.push({
        productID: linkProduct.productID,
        quantity: linkProduct.quantity,
      });
    });
    return array;
  };

  return (
    <div>
      <h1 className="h1-title uppercase ff-primary fs-700 text-center">
        Confirmation de la commande
      </h1>
      <section className="order-create_bill_details text-center">
        {productsInCart && productsInCart.length > 0 && (
          <h2 className="uppercase ff-primary fs-600">Détail de la commande</h2>
        )}
        <div className="order-create_bill_products">
          {productsInCart &&
            productsInCart.length > 0 &&
            productsInCart.map((linkProduct) => {
              const currentProduct = products.find(
                (product) => product._id === linkProduct.productID
              );
              return (
                <div
                  key={currentProduct._id}
                  className="flex justify-content-center"
                >
                  <p>{currentProduct.productName}: </p>
                  <p className="flex">
                    <span className="fw-semi_bold">
                      {currentProduct.price}€ X {linkProduct.quantity} =
                    </span>
                    <span className="fw-semi_bold text-strong_blue">
                      {currentProduct.price * linkProduct.quantity}€
                    </span>
                  </p>
                </div>
              );
            })}
        </div>
        <hr />
        <p className="uppercase ff-secondary">
          Total:{' '}
          <span className="fw-semi_bold text-red">{calcCartTotal()}€</span>
        </p>
      </section>
      <section className="order-create_form">
        <OrderForm
          totalOrder={calcCartTotal()}
          productsOrder={arrayOfProductsID()}
        />
      </section>
    </div>
  );
}

export default OrderCreate;
