function OrderProductCard({ link = null, product = null, quantity = 0 }) {
  return (
    <div className="order-product-card">
      <h5 className="uppercase ff-sans_cond letter-spacing-3">
        {product ? product.productName : 'Nom du produit'}
      </h5>
      <span className="unitary-price-text ff-sans_cond fs-300 fw-semi_bold">
        {product ? `${product.price}` : 'XX.XX'} € x {quantity}
      </span>
    </div>
  );
}

export default OrderProductCard;
