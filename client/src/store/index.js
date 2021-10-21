import { configureStore } from '@reduxjs/toolkit'
import snakeReducer from './snake/snakeSlice'

export const store = configureStore({
  reducer: {
    snakeState: snakeReducer,
  },
})