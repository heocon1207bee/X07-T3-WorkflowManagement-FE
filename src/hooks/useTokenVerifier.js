import { useEffect, useState } from 'react';
import authenServices from '../services/Authen/authenServices';
import { getDataInLocal } from '../utils/storeUser';

const STORE_KEY = process.env.REACT_APP_STORE_KEY;

const useTokenVerifier = () => {
    const [isTokenValid, setTokenValid] = useState(false);
    const [isResetToken, setIsResetToken] = useState(false);

    useEffect(() => {
        const localStore = getDataInLocal(STORE_KEY);
        if (!localStore) {
            return;
        }

        authenServices
            .verifyToken()
            .then((res) => {
                setTokenValid(res.data.isAuthenticated);
            })
            .catch((error) => {
                if (error.response.status === 400 && error.response.data.msg === 'jwt expired') {
                    setIsResetToken(true);
                }

                console.log(error.response.data.msg);
            });
    }, []);

    return { isTokenValid, isResetToken };
};

export default useTokenVerifier;
