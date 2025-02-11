import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState: null,
    reducers:{
        addFeed: (state, action)=>action.payload,
        removeUserFromFeed:(state, action)=>{
           return state.filter((user)=>action.payload!==user._id)
        },
        removeFeed: ()=>null,
    }
})

export const {addFeed, removeFeed, removeUserFromFeed} = feedSlice.actions;

export default feedSlice.reducer