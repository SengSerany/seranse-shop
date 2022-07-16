import { Link } from 'react-router-dom';

function OrderCard({ order }) {
  return (
    <Link
      to={`/admin/orders/${order._id}`}
      className="order-card subheading-link"
    >
      <div className="order-card-header">
        <div className="order-card-header-title">
          <p className="ff-secondary uppercase fw-semi_bold">ID: {order._id}</p>
        </div>
        <div className="order-card-header-date">
          <p className="ff-sans_cond letter-spacing-2">
            <span className="uppercase fw-semi_bold">Date:</span>{' '}
            {`${new Date(order.createdAt).toDateString()} at ${new Date(
              order.createdAt
            ).toLocaleTimeString()}`}
          </p>
        </div>
        <div className="order-card-header-total">
          <p className="uppercase ff-sans_cond letter-spacing-2">
            <span className="uppercase fw-semi_bold">Total:</span> {order.total}{' '}
            €
          </p>
        </div>
        <div className="order-card-header-status">
          <p className=" ff-sans_cond letter-spacing-2">
            <span className="uppercase fw-semi_bold">Statut:</span>{' '}
            <span className="fw-semi_bold text-red">{order.state}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
