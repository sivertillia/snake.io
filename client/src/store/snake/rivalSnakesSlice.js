import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  snakes: [],
}

export const rivalSnakesSlice = createSlice({
  name: 'snakeState',
  initialState,
  reducers: {
    setRivalSnakes: (state, action) => {
      state.snakes = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRivalSnakes } = rivalSnakesSlice.actions

export default rivalSnakesSlice.reducer
