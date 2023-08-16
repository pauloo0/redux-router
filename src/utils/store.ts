import { configureStore } from '@reduxjs/toolkit'

// Reducers
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
