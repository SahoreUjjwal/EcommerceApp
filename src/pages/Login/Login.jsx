
import styles from "./Login.module.css"


export function Login(){
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
                <form className={styles.LoginForm}>
                    <input className={styles.inputEmail} name="text" type="text" required/>
                    <label className={styles.labelEmail} htmlFor="text"><span>Email</span></label> 
                    <input className={styles.inputPassword} name="passwordField" type="password" required/>
                    <label className={styles.labelPassword} htmlFor="passwordField"><span>Password</span></label> 
                    <button>Login</button>
                </form>
            </div>
        </div>
        </div>
        
    )

}