import { useEffect,useState } from "react";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faHeart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/authContext";
import {  useNavigate } from "react-router-dom";
export function Home(){
    const {addTocart,getItemsDB} = useCart();
    const [products,setProducts]=useState([]);
    const navigate = useNavigate();
    const {user} = useAuth();
    useEffect(()=>{
        const fetchProducts =async()=>{
            const products = await fetch("https://fakestoreapi.com/products");
            const productsJson = await products.json();
            setProducts(productsJson);
        }
        if(user){
            getItemsDB(user);
        }
        fetchProducts();
    },[])
    const onAddCart=(user,product)=>{
        if(user){
            addTocart(user,product);
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