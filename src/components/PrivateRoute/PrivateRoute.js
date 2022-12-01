import { Navigate } from 'react-router-dom';

const { useSelector } = require('react-redux');

const PrivateRoute = ({ component: Component }) => {
    const authenStore = useSelector((state) => state.authen);
    const { isAuthenticated } = authenStore;
    if (isAuthenticated) {
        return <Component />;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;
