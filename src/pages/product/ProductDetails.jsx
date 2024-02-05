import { useEffect,useState } from "react";
import styles from "./ProductDetails.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faHeart } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/CartContext";
export const ProductDetails=()=>{
    //useEffect to get product from id
    const [product,setProduct] = useState({});
    const [exists,setExists] = useState(false);
    const {id} = useParams();
    const {user}  = useAuth();
    const {addTocart,items} = useCart();
    useEffect(()=>{
        const getProduct =async()=>{
            const products = await fetch(`https://fakestoreapi.com/products/${id}`) ;
            const productsJson = await products.json();            
            setProduct(productsJson);
        }
        getProduct();
    },[])
    return(<>{JSON.stringify(product).length==2?null:<div className={styles.container}>
    <div className={styles.wrapper}>
        <div className={styles.product}>
            <div className={styles.imageContainer}>
                <img src= {product.image} alt= "name" />
            </div>
            <div className={styles.information}>
                <div className={styles.title}>
                    
                    <p>{product.title}</p>
                    <p>{product.category}</p>
                    <p>{product.description}</p>
                    <p>{product.rating.rate}<span><FontAwesomeIcon icon={faStar} style={{color:"Gold"}} /></span></p>
                    <p>{product.rating.count} ratings</p>
                </div>
                <div className={styles.price}>
                    <span>M.R.P : {product.price}</span>
                </div>
            </div>
        </div>
        <div className={styles.buttons}>
            <button onClick={()=>{addTocart(user,product)}}>Add to Cart</button>
        </div>
    </div>
</div>}</>
        
    )
}