import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import projectsReducer from '../features/projects/projectsSlice';
import teamsReducer from '../features/teams/teamsSlice';
import projectsSliceReducer from '../features/projects/projectsSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        teams: teamsReducer,
        projects: projectsReducer,
        searched: projectsSliceReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
