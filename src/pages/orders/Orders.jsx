import { useEffect ,useState} from "react";
import styles from "./Orders.module.css";
import { getDoc,doc} from "firebase/firestore";
import { db } from "../../assets/config/firestore";
import { useAuth } from "../../contexts/authContext";
export const Orders = ()=>{
    const [orders,setOrders] = useState([]);
    const {user} = useAuth();
    useEffect(()=>{
        const getOrders=async(user)=>{
                const docRef = doc(db, "orders", user.uid);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data().orders);
                let tempData = docSnap.data().orders;
                tempData.forEach((order)=>{
                    var orderDate = order.orderDate.toDate();   
                    var formattedDate = orderDate.toLocaleDateString("en-GB");
                    order.orderDate =formattedDate;
                })
                setOrders(tempData);
          }  
          if(user){
                getOrders(user);
            }
        },[])
    return(
    
            <div className={styles.orderContainer}>
                    {orders.map((order)=>                    
                        order.items.map((item)=>(
                        <div className={styles.orderItem}>
                            <div className={styles.imageContainer}>
                                <img src={item.product.image} alt={item.product.title} />
                            </div>
                            <div className={styles.itemDescription}>
                                <p>{item.product.title}</p>
                                <p>{item.product.category}</p>  
                            </div>  
                            <div className={styles.orderDetails}>    
                                <div><span>qty</span><span>{item.count}</span></div>
                                <div><span>price</span><span>&#x20b9;{item.product.price*item.count}</span></div>
                                <div><span>Date</span><span>{order.orderDate}</span></div>
                            </div>
                        </div>
                        ))
                        )}
            </div>
 
    )
}