import { createSlice } from '@reduxjs/toolkit'
import { themes } from '../../core/constants'

// const initialState = {
//   theme: {
//     head: 'black',
//     body: 'green',
//   }
// }
const initialState = {
  theme: themes[1].value
}

export const themeSlice = createSlice({
  name: 'themeState',
  initialState,
  reducers: {
    setTheme: (state, action ) => {
      state.theme = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
