import { createSlice } from '@reduxjs/toolkit';
import { getDataInLocal, saveToLocal } from '../../../utils/storeUser';
import { STORE_KEY } from '../../../configs/env';

const authenStore = getDataInLocal(STORE_KEY);

const initialState = Object.assign(
    {
        token: '',
        session_token: '',
        user: {},
        isAuthenticated: false,
    },
    authenStore,
);

export const authenSlice = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        setAuthentication: (state, action) => {
            state.user = action.payload.data;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.token = action.payload.token;
            state.session_token = action.payload.session_token;
            const { msg, ...rest } = action.payload;
            saveToLocal(STORE_KEY, rest);
        },
    },
});

export const { setAuthentication } = authenSlice.actions;
export default authenSlice.reducer;
