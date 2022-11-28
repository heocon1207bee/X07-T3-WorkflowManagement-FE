import { configureStore } from '@reduxjs/toolkit';
import searchValueReducer from '../reducers/searchValueReducer';

const store = configureStore({
    reducer: {
        "searchValue": searchValueReducer
    }
})

export default store