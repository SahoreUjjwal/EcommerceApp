import { createSlice } from "@reduxjs/toolkit";  
import { createAsyncThunk } from "@reduxjs/toolkit";
const INITIAL_STATE = {Password:"",ConfirmPassword:"",user:null};
const auth = getAuth(app);

import { createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword, 
    signOut} from 'firebase/auth';
import { app } from "../assets/config/firestore";


export const login = createAsyncThunk(
    "auth/signin",
    async (args,thunkAPI)=>{
        const response=await signInWithEmailAndPassword(auth, args.email, args.password);
        //console.log(response);
        try {
        if(response)   
            {      
                thunkAPI.dispatch(authActions.setUser(response.user.toJSON()));
            }
        }
        catch(e){
            console.log(e);
        }
    }
)

export const signup = createAsyncThunk(
    "auth/signup",
    async (args,thunkAPI)=>{
        if(args.password != args.confirmPassword){
            console.log("passwords dont match");
            return;
        }   
        const response=await createUserWithEmailAndPassword(auth, args.email, args.password);
        try {
            if(response)
            {   
                console.log("user created");
            }
            } catch (error) {
                console.log(error);
                    return;
            }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (args,thunkAPI)=>{
       signOut(auth);

    }
)

export const authSlice  = createSlice({
    name:"auth",
    initialState:INITIAL_STATE,
    reducers:{
        setUser:(state,action)=>{
            //console.log("hi",action.payload);
            state.user=action.payload
        }        
    }
}) 

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;

export const authSelector = (state)=>state.authReducer;
