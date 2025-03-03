import {createSlice} from '@reduxjs/toolkit'
import { userData } from '../utils/storageHandler'

export const AuthSlice= createSlice({
  name:"authSlice",
  initialState:{
      user:userData || null
  },
  reducers:{
      loginUserAction:((state,action)=>{
        console.log(action);
        
          state.user = action.payload
      }),
      registerUserAction:((state,action)=>{

          state.user = action.payload
        
      }),
      logoutAction: (state, action) => {
        state.user = null;
      }
  }
})

export default AuthSlice.reducer

export const {loginUserAction,registerUserAction,logoutAction} =  AuthSlice.actions