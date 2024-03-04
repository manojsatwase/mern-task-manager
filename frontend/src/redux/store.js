import { configureStore } from '@reduxjs/toolkit';
import createUserSlice from './slices/createUserSlice'
import singleTaskSlice from './slices/singleTaskSlice';
import searchTaskSlice from './slices/searchTaskSlice';
import createTaskSlice from './slices/createTaskSlice';

const store = configureStore({
    reducer:{
        createUser:createUserSlice,
        singleTask:singleTaskSlice,
        createTask:createTaskSlice,
        searchText:searchTaskSlice
    }
})

export default store;