import { createSlice } from '@reduxjs/toolkit'
import { themes } from '../../core/constants'

// const initialState = {
//   theme: {
//     head: 'black',
//     body: 'green',
//   }
// }
const initialState = {
  MAP_SIZE: 0,
  apples: []
}

export const mapSlice = createSlice({
  name: 'applesState',
  initialState,
  reducers: {
    setApples: (state, action ) => {
      state.apples = action.payload
    },
    setMapSize: (state, action) => {
      state.MAP_SIZE = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setApples, setMapSize } = mapSlice.actions

export default mapSlice.reducer
