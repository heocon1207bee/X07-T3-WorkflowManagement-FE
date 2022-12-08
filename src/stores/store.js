import { configureStore } from '@reduxjs/toolkit';

import searchValueReducer from '../reducers/searchValueReducer';
import projectDataReducer from '../reducers/projectDataReducer';
import authenReducer from './reducers/Auth/authenSlice';

const store = configureStore({
    reducer: {
        "searchValue": searchValueReducer,
        "projectData": projectDataReducer,
        authen: authenReducer,
    }
})

export default store
