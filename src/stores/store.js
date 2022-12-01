import { configureStore } from '@reduxjs/toolkit';

import authenReducer from './reducers/Auth/authenSlice';

export const store = configureStore({
    reducer: {
        authen: authenReducer,
    },
});
