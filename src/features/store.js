import { configureStore } from "@reduxjs/toolkit";

import experienceSlice from './experienceSlice';

const dataStore = configureStore({
  reducer: {
    experience: experienceSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})

export default dataStore;