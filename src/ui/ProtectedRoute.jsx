import { useEffect } from 'react';
import { useAccount } from '../auth/useAccount';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ allowedRoles, children }) {
  const navigate = useNavigate();
  const { data, isPending, isAuthenticated } = useAccount();
  // console.log(data);
  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate('/login');
    } else if (
      allowedRoles &&
      data &&
      !allowedRoles.includes(data.acc.vaiTro)
    ) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, isPending, navigate, allowedRoles, data]);

  if (isPending)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Spinner />;
      </div>
    );

  if (
    isAuthenticated &&
    (!allowedRoles || (data.acc && allowedRoles.includes(data.acc.vaiTro)))
  ) {
    return children;
  }

  return null;
}

export default ProtectedRoute;
