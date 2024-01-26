import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import styles from "./Login.module.css"


export function Login(){
    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const {handleLogin} = useAuth();
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