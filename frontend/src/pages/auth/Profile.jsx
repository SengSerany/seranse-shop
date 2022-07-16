import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import { retrieveUser } from '../../features/auth/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
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

  return (
    <div className="flex-column text-center">
      <h1 className="h1-title uppercase ff-primary fs-800">Mon compte</h1>
      <h4 className="uppercase ff-primary fs-600">Votre adresse email</h4>
      <p>{user.email}</p>
    </div>
  );
}

export default Profile;
