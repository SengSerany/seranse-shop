import { Link } from 'react-router-dom';

function ProductIndexCard({ product }) {
  return (
    <Link to={`/products/${product._id}`} className="index-card text-center">
      <div className="index-card_image">
        <img src={product.image} alt={product.productName} />
      </div>
      <div className="index-card_content">
        <h3 className="index-card_title uppercase ff-sans_cond fs-400 fw-semi_bold">
          {product.productName}
        </h3>
        <p className="index-card_description">{product.description}</p>
        <p className="index-card_price uppercase ff-sans_cond fs-400 fw-semi_bold">
          {product.price}€
        </p>
      </div>
    </Link>
  );
}

export default ProductIndexCard;
