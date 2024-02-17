
import styles from "./SignUp.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../reducers/authReducer";
export function SignUp(){
    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const handleSignUp=(e,email,password,confirmPassword)=>{
            e.preventDefault();
            dispatch(signup({email,password,confirmPassword}));
        } 
    return(
        <div className={styles.main}>
            <div className={styles.LoginContainer}>
            <div className={styles.leftContainer}>
               <span>Sign Up</span> 
               <p>
                <span>Get access to exciting discounts and gifts.</span>
               </p>
            </div>
            <div className={styles.rightContainer}>
                <form onSubmit={(e)=>handleSignUp(e,Email,Password,ConfirmPassword)}  className={styles.LoginForm}>
                    <input onChange={(e)=>setEmail(e.target.value)} className={styles.inputEmail} name="text" type="text" value={Email} required/>
                    <label className={styles.labelEmail} htmlFor="text"><span>Email</span></label> 
                    <input onChange={(e)=>setPassword(e.target.value)} className={styles.inputPassword} name="passwordField" type="password" value={Password} required/>
                    <label className={styles.labelPassword} htmlFor="passwordField"><span>Password</span></label> 
                    <input onChange={(e)=>setConfirmPassword(e.target.value)} className={styles.inputConfirmPassword} name="ConfirmpasswordField" type="password" value={ConfirmPassword} required/>
                    <label className={styles.labelConfirmPassword} htmlFor="ConfirmpasswordField"><span>Confirm Password</span></label> 
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
        </div>
        
    )

}