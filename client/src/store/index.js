import { configureStore } from '@reduxjs/toolkit'
import snakeReducer from './snake/snakeSlice'
import mapReducer from './snake/mapSlice'
import rivalSnakesReducer from './snake/rivalSnakesSlice'

export const store = configureStore({
  reducer: {
    snakeState: snakeReducer,
    mapState: mapReducer,
    rivalSnakesState: rivalSnakesReducer,
  },
})