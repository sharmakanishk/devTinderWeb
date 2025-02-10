import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers:{
        addRequest: (state, action)=> action.payload,
        removeRequest:()=>null,
        actOnRequest:(state, action)=>{
            return state.filter((item)=>{
                if(item._id!= action.payload){
                    return item
                }
            })
        }
    }
})

export const {addRequest, removeRequest, actOnRequest} = requestSlice.actions

export default requestSlice.reducer