import useUser from '../hooks/UserProvider';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
   const { user } = useUser();
 
   return user === null ? <Navigate to="/login" replace /> : <Outlet />;
}
