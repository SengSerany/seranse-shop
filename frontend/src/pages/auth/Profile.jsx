import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import { retrieveUser } from '../../features/auth/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (isRead) return;
    setIsRead(true);
    if (user.id !== null && !user.email) {
      dispatch(retrieveUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const sortOrders = [...orders].sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
  );

  return (
    <div className="flex-column text-center">
      <h1 className="h1-title uppercase ff-primary fs-800">Mon compte</h1>
      <br />
      <h4 className="uppercase ff-primary fs-600">Votre adresse email</h4>
      <p>{user.email}</p>
      <br />
      <section>
        <h2 className="uppercase ff-primary fs-600">Mes commandes</h2>
        {sortOrders && sortOrders.length > 0 ? (
          sortOrders.map((order) => {
            const orderDate = new Date(order.createdAt)
              .toDateString()
              .split(' ');

            orderDate.shift();
            return (
              <div key={order.id} className="profile-order flex-column">
                <p>
                  <span className="fw-semi_bold">
                    Commande du {orderDate.join(' ')}
                  </span>
                  <br />
                  Statut: <em>{order.state}</em>
                  <br />
                  {order.total}€
                </p>
              </div>
            );
          })
        ) : (
          <p>Vous n'avez pas encore de commandes</p>
        )}
      </section>
    </div>
  );
}

export default Profile;
