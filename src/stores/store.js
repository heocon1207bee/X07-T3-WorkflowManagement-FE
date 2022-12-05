import { configureStore } from '@reduxjs/toolkit';

import searchValueReducer from '../reducers/searchValueReducer';
import authenReducer from './reducers/Auth/authenSlice';

const store = configureStore({
    reducer: {
        "searchValue": searchValueReducer,
        authen: authenReducer,
    }
})

export default store
