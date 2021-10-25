import { configureStore } from '@reduxjs/toolkit'
import snakeReducer from './snake/snakeSlice'
import themeReducer from './snake/themeSlice'
import rivalSnakesReducer from './snake/rivalSnakesSlice'

export const store = configureStore({
  reducer: {
    snakeState: snakeReducer,
    themeState: themeReducer,
    rivalSnakesState: rivalSnakesReducer,
  },
})