import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
    const authStore = useSelector((state) => state.authen);
    const { isAuthenticated } = authStore;

    if (isAuthenticated) return <Component />;

    return <Navigate to="/login" />;
};

export default PrivateRoute;
