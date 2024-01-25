import logo from "../../assets/pictures/logo.jpeg"
import styles from "./Navbar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faUser,faCartShopping,faCaretDown,faIdCard,faBox,faHeart,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import {Outlet,Link} from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
export function Navbar(){
    const {user,setUser} = useAuth();
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
                <div onMouseEnter={displayMenu} onMouseLeave={displayMenu} className={styles.login}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>{user?"Logout":"Login"}</span>
                    <FontAwesomeIcon className={styles.dropIcon} icon={faCaretDown} />
                    <div className={display?styles.loginDropdownShow:styles.loginDropdownHidden}>  
                        {user?<div onClick={()=>setUser(null)} className={styles.newCustomer}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <span>Logout</span>
                        </div>:<div className={styles.newCustomer}>
                            <span>New Customer?</span>
                            <Link to="/SignUp">Sign Up</Link>
                        </div>}
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