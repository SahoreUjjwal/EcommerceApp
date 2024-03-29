import { useEffect,useState } from "react";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faHeart } from '@fortawesome/free-solid-svg-icons'
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../reducers/authReducer";
import { addTocart, getItemsDB } from "../../reducers/cartReducer";
export function Home(){
    const dispatch = useDispatch();    
    const [products,setProducts]=useState([]);
    const navigate = useNavigate();
    const {user} = useSelector(authSelector);
   
    useEffect(()=>{
        const fetchProducts =async()=>{
            const products = await fetch("https://fakestoreapi.com/products");
            const productsJson = await products.json();
            setProducts(productsJson);
            if(user){

                dispatch(getItemsDB({user}));
            }
            
        }
        fetchProducts();
    },[])
    const onAddCart=(user,product)=>{
        if(user){
            
            dispatch(addTocart({user,product}));
            return;
        }
        navigate("/Login");
    }
    return(<>
        <div className={styles.container}>
            <div className={styles.sideBar}>   
            </div>
            <div className={styles.products}>
                {products.map((product,index)=>(<>
                    <div className={styles.card}>
                        <div className={styles.imageContainer}><img key={index} src={product.image} alt={product.title}/><FontAwesomeIcon className={styles.favourite} icon={faHeart} /></div>
                        <p>{product.title}</p>
                        <p>Price {product.price}</p>
                        <p>Rating <span>{product.rating.rate}</span><FontAwesomeIcon icon={faStar} style={{color:"Gold"}} /></p>    
                        <div className={styles.buttonContainer}>
                            <button onClick={()=>onAddCart(user,product)} className={styles.AddCartButton}>
                                Add to Cart
                            </button>
                        </div>                 
                    </div>
                </>))}
            </div> 
        </div>
    </>);
}