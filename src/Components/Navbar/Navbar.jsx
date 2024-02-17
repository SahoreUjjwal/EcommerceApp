import logo from "../../assets/pictures/logo.jpeg"
import styles from "./Navbar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faUser,faCartShopping,faCaretDown,faIdCard,faBox,faHeart,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import {Outlet,Link, NavLink} from "react-router-dom";
import { authSelector } from "../../reducers/authReducer";
import { Searchbar } from "../Searchbar/Searchbar";
import { useSelector } from "react-redux";
import { cartSelector } from "../../reducers/cartReducer";
import { logout } from "../../reducers/authReducer";
import { useDispatch } from "react-redux";
export function Navbar(){
    const {user} = useSelector(authSelector);

    const[display,setDisplay] = useState(false);
    const [count,setCount] = useState();
    const {items} =useSelector(cartSelector);
    const displayMenu=()=>{
        setDisplay(!display);
    }
    function logoutUser(e){
        e.stopPropagation();
        dispatch(logout());
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
                <Searchbar/>
                <div  onMouseEnter={displayMenu} onMouseLeave={displayMenu} className={styles.login}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>{user?"Logout":"Login"}</span>
                    <FontAwesomeIcon className={styles.dropIcon} icon={faCaretDown} />
                    <div className={display?styles.loginDropdownShow:styles.loginDropdownHidden}>  
                        {user?
                            <>
                                <div><FontAwesomeIcon icon={faIdCard} /><span>Profile</span></div>
                                <div onClick={(e)=>{logoutUser(e)}}><FontAwesomeIcon icon={faIdCard} /><span>logout</span></div>
                            </>
                            :<>
                                <div className={styles.newCustomer}>
                                    <span>New Customer?</span>
                                    <Link to="/SignUp">Sign Up</Link>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faIdCard} />
                                    <Link to="Login"><span>Login</span>
                                    </Link>
                                </div>
                            </>
                        }
                        <NavLink className={styles.navDropdown} to="orders"><FontAwesomeIcon icon={faBox} /><span> Orders</span></NavLink>
                        <div><FontAwesomeIcon icon={faHeart} /><span>Wishlist</span></div>       
                    </div>
                </div>
                <Link to={user?"cart":"Login"} className={styles.cartNav}>
                    <div className={styles.cart}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>cart</span>{user?<span>{count}</span>:null}
                    </div>
                </Link>
            </div>
            <Outlet/>
        </>

    )
}   