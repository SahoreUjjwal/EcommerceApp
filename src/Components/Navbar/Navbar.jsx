import logo from "../../assets/pictures/logo.jpeg"
import styles from "./Navbar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faUser,faCartShopping,faCaretDown,faIdCard,faBox,faHeart,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import {Outlet,Link, NavLink} from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/CartContext";

export function Navbar(){
    const {user,logout} = useAuth();
    const[display,setDisplay] = useState(false);
    const [count,setCount] = useState();
    const {items,setItems} =useCart();
    const displayMenu=()=>{
        setDisplay(!display);
    }
    useEffect(()=>{
        const countCart=()=>{
            const tempcount = items.length();
            setCount(tempcount);
        }
        user?countCart():null;
    },[])
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
                <div onClick={(e)=>{logout(e)}} onMouseEnter={displayMenu} onMouseLeave={displayMenu} className={styles.login}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>{user?"Logout":"Login"}</span>
                    <FontAwesomeIcon className={styles.dropIcon} icon={faCaretDown} />
                    <div className={display?styles.loginDropdownShow:styles.loginDropdownHidden}>  
                        {user?
                        <div><FontAwesomeIcon icon={faIdCard} /><span>Profile</span></div>
                        :<><div className={styles.newCustomer}>
                            <span>New Customer?</span>
                            <Link to="/SignUp">Sign Up</Link>
                        </div>
                        <div><FontAwesomeIcon icon={faIdCard} /><Link to="/Login"><span>Login</span></Link></div>
                        </>
                        }
                        <div><FontAwesomeIcon icon={faBox} /><span>Orders</span></div>
                        <div><FontAwesomeIcon icon={faHeart} /><span>Wishlist</span></div>       
                    </div>
                </div>
                <NavLink to={user?"cart":"Login"} className={styles.cartNav}>
                    <div className={styles.cart}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>cart</span>{user?<span>{count}</span>:null}
                    </div>
                </NavLink>
            </div>
            <Outlet/>
        </>

    )
}   