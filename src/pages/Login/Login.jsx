import { useState } from "react";

import styles from "./Login.module.css"
import { useSelector } from "react-redux";
import { authActions } from "../../reducers/authReducer";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authReducer";
export function Login(){
    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const dispatch = useDispatch();
    const handleLogin=(e,email,password)=>{
            e.preventDefault();
            dispatch(login({email,password}));
        } 
    return(
        <div className={styles.main}>
            <div className={styles.LoginContainer}>
            <div className={styles.leftContainer}>
               <span>Login</span> 
               <p>
                <span>Get access to your Orders, Wishlist and Recommendations</span>
               </p>
            </div>
            <div className={styles.rightContainer}>
                <form onSubmit={(e)=>handleLogin(e,Email,Password)}  className={styles.LoginForm}>
                    <input onChange={(e)=>setEmail(e.target.value)} className={styles.inputEmail} name="text" type="text" value={Email} required/>
                    <label className={styles.labelEmail} htmlFor="text"><span>Email</span></label> 
                    <input onChange={(e)=>setPassword(e.target.value)} className={styles.inputPassword} name="passwordField" type="password" value={Password} required/>
                    <label className={styles.labelPassword} htmlFor="passwordField"><span>Password</span></label> 
                    <button>Login</button>
                </form>
            </div>
        </div>
        </div>
        
    )

}