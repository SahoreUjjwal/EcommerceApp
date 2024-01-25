import { createContext, useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword } from 'firebase/auth';
import {app} from "../assets/config/firestore";

const userContext = createContext();

export const useAuth=()=>{
    const {user,setUser,Email,setEmail,Password,setPassword,handleLogin} = useContext(userContext);
    return {user,setUser,Email,setEmail,Password,setPassword,handleLogin};  
}



export default function AuthContext({children}){
    
    const [Email,setEmail]= useState("");
    const [Password,setPassword] = useState("");
    const [user,setUser] = useState({});
    const auth = getAuth(app);
    const handleLogin=async(email,password)=>{
        try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('User signed in successfully!');
                } catch (error) {
                setError(error.message);
                }
            }
    return(

            <userContext.Provider value={{user,setUser,Email,Password,setEmail,setPassword,handleLogin}}>
                {children}
            </userContext.Provider>

    )
}