import logo from "../../assets/pictures/logo.jpeg"
import styles from "./Navbar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faUser,faCartShopping,faCaretDown,faIdCard,faBox,faHeart } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import {Link,Outlet} from "react-router-dom";
export function Navbar(){

    const[display,setDisplay] = useState(false);
    const displayMenu=()=>{
        setDisplay(!display);
    }
    return(
        <>       
            <div className={styles.navComponent}>
                <div className={styles.ecomIcon}>
                    <img src={logo} alt="icon" />
                </div>
                <div className={styles.formContainer}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <form >
                        <input placeholder="Search" className={styles.input} type="text" />
                    </form>
                </div>
                <div  onMouseEnter={displayMenu} onMouseLeave={displayMenu} className={styles.login}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Login</span>
                    <FontAwesomeIcon className={styles.dropIcon} icon={faCaretDown} />
                    <div className={display?styles.loginDropdownShow:styles.loginDropdownHidden}>  
                        <div class={styles.newCustomer}>
                            <span>New Customer?</span>
                            <a href="/">Sign Up</a>
                        </div>
                        <div><FontAwesomeIcon icon={faIdCard} /><span>My Profile</span></div>
                        <div><FontAwesomeIcon icon={faBox} /><span>Orders</span></div>
                        <div><FontAwesomeIcon icon={faHeart} /><span>Wishlist</span></div>       
                    </div>
                </div>
                <div className={styles.cart}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    cart
                </div>
            </div>
            <Outlet/>
        </>

    )
}   