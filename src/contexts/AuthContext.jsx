import { createContext, useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut} from 'firebase/auth';
import {app} from "../assets/config/firestore";

import "react-toastify/dist/ReactToastify.css";

const userContext = createContext();

export const useAuth=()=>{
    const {user,setUser,logout,ConfirmPassword,setConfirmPassword,Password,setPassword,handleLogin,handleSignUp} = useContext(userContext);
    return {user,setUser,logout,ConfirmPassword,setConfirmPassword,Password,setPassword,handleLogin,handleSignUp};  
}

const auth = getAuth(app);

export default function AuthContext({children}){
    
    const [Password,setPassword] = useState("");
    const [ConfirmPassword,setConfirmPassword] = useState("");
    const [user,setUser] = useState(null);
    const [cart,setCart] =useState([]);
    onAuthStateChanged(auth,(user)=>{
        setUser(user);
    })
    // const logout=(e)=>{
    //     e.preventDefault();
    //     e.stopPropagation();
    //     signOut(auth);
    // }
    // const handleLogin=async(e,email,password)=>{
    //     e.preventDefault();
    //     try {
    //             const response=await signInWithEmailAndPassword(auth, email, password);
    //             if(response)
    //             {   
    //                 console.log(response);
    //                 setUser(response.user) ;
    //             }
    //             } catch (error) {
                   
    //                 return;
    //              }
    //         } 
    // const handleSignUp = async(e,email,password,confirmPassword)=>{
    //     e.preventDefault();
    //     if(password != confirmPassword){
    //         console.log("passwords dont match");
    //         return;
    //     }   
    //     try {
    //             const response=await createUserWithEmailAndPassword(auth, email, password);
    //             console.log(response);
    //             if(response)
    //             {   

    //                 console.log("user created");
    //             }
    //             } catch (error) {
    //                 console.log(error);
    //                     return;
    //             }
    //         }

   


    return(

            <userContext.Provider value={{user,setUser,logout,Password,setPassword,handleLogin,ConfirmPassword,setConfirmPassword,handleSignUp}}>
                {children}
            </userContext.Provider>

    )
}