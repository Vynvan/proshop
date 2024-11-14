import useUser from '../components/UserProvider';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
   const { user } = useUser();
   console.log('Protected Route: User', user)
 
   return user === null ? <Navigate to="/login" replace /> : <Outlet />;
}
