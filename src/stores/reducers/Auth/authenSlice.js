import { createSlice, current } from '@reduxjs/toolkit';

const authenStore = localStorage.getItem('wf_user');

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
            state.user = action.payload;
            state.isAuthenticated = true;
            console.log(current(state));
        },
    },
});

export const { setAuthentication } = authenSlice.actions;
export default authenSlice.reducer;
