import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import authenServices from '../services/Authen/authenServices';
import { setAuthentication } from '../stores/reducers/Auth/authenSlice';
import { getToken } from '../utils/storeUser';
import { STORE_KEY } from '../configs/env';

const useVerifyToken = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getToken(STORE_KEY);
        if (!token) return;
        authenServices
            .verifyToken()
            .then((res) => {
                if (!res) return;
                const { isAuthenticated } = res.data;
                dispatch(setAuthentication(isAuthenticated));
            })
            .catch((error) => console.log(error));
    }, []);
};

export default useVerifyToken;
