import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import searchValueReducer from '../reducers/searchValueReducer';

const store = configureStore({
    reducer: {
        "searchValue": searchValueReducer
    }
})

export default store
=======

import authenReducer from './reducers/Auth/authenSlice';

export const store = configureStore({
    reducer: {
        authen: authenReducer,
    },
});
>>>>>>> main
