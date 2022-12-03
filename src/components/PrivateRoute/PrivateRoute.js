import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useTokenVerifier from '../../hooks/useTokenVerifier';
import authenServices from '../../services/Authen/authenServices';
import { updateToken } from '../../utils/storeUser';

const STORE_KEY = process.env.REACT_APP_STORE_KEY;

const PrivateRoute = ({ component: Component }) => {
    const { isTokenValid, isResetToken } = useTokenVerifier();
    console.log('is Token valid:::', isTokenValid);

    /* useEffect(() => {
        if (isResetToken)
            authenServices
                .renewToken()
                .then((res) => {
                    updateToken(STORE_KEY, res.data.token);
                })
                .catch((err) => console.log(err.response));
    }, [isResetToken]); */

    if (isTokenValid) {
        return <Component />;
    }

    return <div>Loading...</div>;
    // return <Navigate to="/login" />;
};

export default PrivateRoute;
