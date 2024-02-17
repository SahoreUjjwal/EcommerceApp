
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons'
import styles from "./Cart.module.css";
import { useEffect,useState } from "react";

import { cartSelector, getItemsDB,placeOrder,increaseCount,decreaseCount } from "../../reducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from '../../reducers/authReducer';
export function Cart(){
    const dispatch = useDispatch();
    const {items,totalItems} = useSelector(cartSelector); 
    const {user} = useSelector(authSelector);
    const [totalPrice,setTotalPrice] = useState(0);
    useEffect(()=>{
        if(user){
            if(user){
                dispatch(getItemsDB({user}));
            }
            // const total = items.reduce((total,curr)=>total+curr.product.price*curr.count,0,);

            // setTotalPrice(total);
        }
    },[])
    return (
        <>
            <div className={styles.classWrapper}>
                <div className={styles.cartContainer}>
                    {items && items.map((item)=>(
                        <div className={styles.cartItem}>
                            <div className={styles.imageContainer}>
                                <img src={item.product.image} alt={item.product.title} />
                            </div>
                            <div className={styles.description}>
                                <p><span>Title </span><span>{item.product.title}</span></p>
                                <p><span>Category </span><span>{item.product.category}</span></p>
                                <p><span>Price </span><span>{item.product.price}</span></p>
                                <div className={styles.increaseDecreaseButton}>
                                    <FontAwesomeIcon onClick={()=>{dispatch(decreaseCount({user,item}))}} icon={faMinus} />
                                    <span className={styles.countSpan}>{item.count}</span>
                                    <FontAwesomeIcon onClick={()=>{dispatch(increaseCount({user,item}))}} icon={faPlus} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.PlaceOrder}>
                        <button onClick={()=>dispatch(placeOrder({user}))}>
                            Place Order
                        </button>
                    </div>
                </div> 
                <div className={styles.totalContainer}> 
                        <div className={styles.heading}>
                            <span>PRICE DETAILS</span>
                        </div>
                        <div className={styles.priceContainer}>
                            <div><span>Price({totalItems})</span><span>&#x20b9; {totalPrice}</span></div>
                            <div><span>Discount</span><span>0</span></div>
                            <div><span>Delivery Charges</span><span>Free</span></div>  
                        </div>
                        <div className={styles.total}>
                            <span>Total Amount</span><span>&#x20b9;{totalPrice}</span>
                        </div>
                </div>
            </div>
        </>
    )
}