import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  snake: {
    position: [],
    speed: null,
    theme: {},
    username: '',
    id: '',
    apples: [],
  },
}

export const snakeSlice = createSlice({
  name: 'snakeState',
  initialState,
  reducers: {
    setSnake: (state, action) => {
      state.snake = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSnake } = snakeSlice.actions

export default snakeSlice.reducer
