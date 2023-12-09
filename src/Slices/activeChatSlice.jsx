import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    active:"active"
}

export const activeChatSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    active: (state,action) => {
//    console.log(state);
    //  console.log(action.payload);
    state.active =action.payload;

    },
    
  },
})


export const {active} = activeChatSlice.actions

export default activeChatSlice.reducer