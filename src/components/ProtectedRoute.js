/**
 * @module Components
 */

import useUser from '../hooks/UserProvider';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * A component that protects routes by checking if a user is authenticated.
 * If the user is not authenticated, it redirects to the login page. If the user is authenticated,
 * it renders the child components (outlet).
 * 
 * @component
 * @returns {JSX.Element} A redirection to the login page or the rendered child components.
 * @example
 * // Usage of the ProtectedRoute component
 * <ProtectedRoute>
 *   <SomeProtectedComponent />
 * </ProtectedRoute>
 * 
 * @see {@link https://reactrouter.com/web/guides/quick-start} for more information on React Router.
 */
function ProtectedRoute() {
   const { user } = useUser();
 
   return user === null ? <Navigate to="/login" replace /> : <Outlet />;
}

export default ProtectedRoute;
