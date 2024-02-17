import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc,setDoc,query,getDoc ,getDocs,where,doc,updateDoc,arrayUnion } from "firebase/firestore"; 
import { db } from "../assets/config/firestore";
export const INITIAL_STATE = {items:[],totalItems:0} 


export const addTocart = createAsyncThunk(
    "cart/add",
    async (args,thunkAPI)=>{
       
        const itemsCart =thunkAPI.getState().cartReducer.items;
        const totalItems = thunkAPI.getState().cartReducer.totalItems;
        const exists = itemsCart.findIndex((item)=>item.product.id ===args.product.id);
        console.log("hello",exists);
        if(exists!=-1){
           // console.log("hi");
            itemsCart[exists].count = itemsCart[exists].count+1;
            const q = query(collection(db, "cart"), where("user", "==", args.user.uid));
            const querySnapshot = await getDocs(q);
           // console.log(querySnapshot);
            const cartDoc = doc(db, "cart", querySnapshot.docs[0].id);
            await updateDoc(cartDoc, {
                items:itemsCart
            });
            thunkAPI.dispatch(cartActions.setTotalItems(totalItems+1));
            thunkAPI.dispatch(cartActions.setItems(itemsCart));
        }
        else{
           // console.log("yo",args.product);
            const tt = itemsCart.length>0?[{product:args.product,count:1},...itemsCart]:[{product:args.product,count:1}];
            //console.log("tf",tt);
            const q = query(collection(db, "cart"), where("user", "==", args.user.uid));
            const querySnapshot = await getDocs(q);
            //console.log("add",querySnapshot);
            if(querySnapshot.docs.length==0)
            {
                const docRef = await addDoc(collection(db, "cart"), {
                    user:args.user.uid,
                    items:tt
              });
            }
            else{
                //console.log("kpp");
                const cartDoc = doc(db, "cart", querySnapshot.docs[0].id);
                await updateDoc(cartDoc, {
                    items:tt
                });
                
            }
            thunkAPI.dispatch(cartActions.setTotalItems(totalItems+1));
            thunkAPI.dispatch(cartActions.setItems(itemsCart));
    }
})


export const increaseCount=createAsyncThunk(
    "cart/increaseCount",
    async({user,item},thunkAPI)=>{
    let itemsCart =thunkAPI.getState().cartReducer.items;
    let totalItems =thunkAPI.getState().cartReducer.totalItems;
    const index = itemsCart.findIndex((i)=>i.product.id == item.product.id);
    let newState = itemsCart.map((item,i)=>{
        if(i===index)
        {
            item={...item,count:item.count+1};
           // return newItem;
        }
        return item;
    })
   // console.log("yo",itemsCart);
    const q = query(collection(db, "cart"), where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);
        //console.log("no",querySnapshot);
        const cartDoc = doc(db, "cart", querySnapshot.docs[0].id);
        await updateDoc(cartDoc,{
            items:newState
        });
    thunkAPI.dispatch(cartActions.setTotalItems(totalItems));
    thunkAPI.dispatch(cartActions.setItems(newState));
})
        
export const decreaseCount= createAsyncThunk(
    "cart/decreaseCount",
    async({user,item},thunkAPI)=>{
    const items =thunkAPI.getState().cartReducer.items;
    const totalItems = thunkAPI.getState().cartReducer.totalItems;
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
    thunkAPI.dispatch(cartActions.setTotalItems(totalItems-1));
    thunkAPI.dispatch(cartActions.setItems(items));
})

export const getItemsDB=createAsyncThunk(
    "cart/getItemsDB",
    async(args,thunkAPI)=>{
    const q = query(collection(db, "cart"), where("user", "==", args.user.uid));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if(querySnapshot.docs[0]!=null){
        console.log("hi",querySnapshot.docs[0].data());
        thunkAPI.dispatch(cartActions.setItems(querySnapshot.docs[0].data().items));
        const totalItems = querySnapshot.docs[0].data().items.reduce((total,curr)=>total+curr.count,0,);
        thunkAPI.dispatch(cartActions.setTotalItems(totalItems));
        }
    })
export const placeOrder=createAsyncThunk(
    "cart/placeOrder",
    async(args,thunkAPI)=>{
    const itemsCart =thunkAPI.getState().cartReducer.items;
        
    const docRef = doc(db, "orders",args.user.uid);
    const docSnap = await getDoc(docRef);
    console.log('yoohoo');
    if(docSnap.exists())
        {
            console.log('yoohoo2');
            await updateDoc(docRef, {
                orders: arrayUnion({itemsCart,orderDate:new Date()})
            });
            thunkAPI.dispatch(cartActions.setItems([]));
        }
    else{
        await setDoc(doc(db, "orders", args.user.uid),{orders: [{
            itemsCart,
            orderDate:new Date()
    }]});
    }
    thunkAPI.dispatch(cartActions.setTotalItems(0));
    thunkAPI.dispatch(cartActions.setItems([]));
})

export const cartSlice = createSlice({
    name:"cart",
    initialState:INITIAL_STATE,
    reducers:{
            setItems:(state,actions)=>{
                console.log(actions.payload);
                state.items= actions.payload;
            } ,
            setTotalItems:(state,actions)=>{
                state.totalItems =actions.payload;
            }    
    }
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelector = (state)=>state.cartReducer;