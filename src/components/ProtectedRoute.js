import useUser from '../components/UserProvider';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
   const { user } = useUser();

   if (!user) {
      return <Navigate to="/login" replace />;
   }

   return children;
}

export default ProtectedRoute;
