import { createContext, useContext, useState } from "react"
import { collection, addDoc,setDoc,query,getDoc ,getDocs,where,doc,updateDoc,arrayUnion } from "firebase/firestore"; 
import { db } from "../assets/config/firestore";
const cartContext  = createContext();
export const useCart = ()=>{
    const value = useContext(cartContext);
    return value;
}

const CartContext =({children})=>{
    let [items,setItems] = useState([]);
    const [totalItems,setTotalItems] = useState(0);
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
            setTotalItems(totalItems+1);
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
                
            }
            setTotalItems(totalItems+1);
            setItems(items);
        }
        
    }

    const increaseCount=async(user,item)=>{
        const index = items.findIndex((i)=>i.product.id == item.product.id);
        items[index].count+=1;
        const q = query(collection(db, "cart"), where("user", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const cartDoc = doc(db, "cart", querySnapshot.docs[0].id);
            await updateDoc(cartDoc, {
                items:items
            });
        setTotalItems(totalItems+1);
        setItems(items);
      
    }
    const decreaseCount=async(user,item)=>{
        const index = items.findIndex((i)=>i.product.id == item.product.id);
        if(items[index].count==1)
        {
            items.splice(index,1);
        }
        else{
            items[index].count-=1;
        }   
        const q = query(collection(db, "cart"), where("user", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const cartDoc = doc(db, "cart", querySnapshot.docs[0].id);
            await updateDoc(cartDoc, {
                items:items
            });
        setTotalItems(totalItems-1);
        setItems(items);
    }
    const getItemsDB=async(user)=>{
        const q = query(collection(db, "cart"), where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs[0]!=null){
            console.log(querySnapshot.docs[0].data().items);
            setItems(querySnapshot.docs[0].data().items);
            const totalItems = querySnapshot.docs[0].data().items.reduce((total,curr)=>total+curr.count,0,);
            setTotalItems(totalItems);
            }
        };
    const placeOrder=async(user)=>{
    
        const docRef = doc(db, "orders",user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists())
            {
                await updateDoc(docRef, {
                    orders: arrayUnion({items,orderDate:new Date()})
                });
                setItems([]);
            }
        else{
            await setDoc(doc(db, "orders", user.uid),{orders: [{
                items,
                orderDate:new Date()
        }]});
        }
        setTotalItems(0);
        setItems(0);
    }
    return(
            <cartContext.Provider value={{items,setItems,addTocart,getItemsDB,totalItems,decreaseCount,increaseCount,placeOrder}}>
                {children}
            </cartContext.Provider>
    )
}
export default CartContext;