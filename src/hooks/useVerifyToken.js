import { getToken } from '../utils/storeUser';
import { STORE_KEY } from '../configs/env';

const useVerifyToken = () => {
    const token = getToken(STORE_KEY);
};
