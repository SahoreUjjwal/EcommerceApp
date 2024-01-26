import { createContext, useContext, useState } from "react"
import { collection, addDoc,query ,getDocs,where,doc,updateDoc} from "firebase/firestore"; 
import { db } from "../assets/config/firestore";
const cartContext  = createContext();
export const useCart = ()=>{
    const value = useContext(cartContext);
    return value;
}

const CartContext =({children})=>{
    let [items,setItems] = useState([]);
    const addTocart=async(user,product)=>{
        const exists = items.findIndex((item)=>item.product.id ===product.id);
        if(exists!=-1){
            items[exists].count = items[exists].count+1;
            const q = query(collection(db, "cart"), where("user", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const cartDoc = doc(db, "cart", querySnapshot.docs[0].id);
            await updateDoc(cartDoc, {
                items:items
            });
            setItems(items);
        }
        else{
            items = [{product,count:1},...items];
            const q = query(collection(db, "cart"), where("user", "==", user.uid));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.docs.length==0)
            {
                const docRef = await addDoc(collection(db, "cart"), {
                    user:user.uid,
                    items
              });
            }
            else{
                const cartDoc = doc(db, "cart", querySnapshot.docs[0].id);
                await updateDoc(cartDoc, {
                    items:items
                });
                setItems(items);
            }
        }
        
    }
    return(
            <cartContext.Provider value={{items,setItems,addTocart}}>
                {children}
            </cartContext.Provider>
    )
}
export default CartContext;