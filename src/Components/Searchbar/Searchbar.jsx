import styles from "./Searchbar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faUser,faCartShopping,faCaretDown,faIdCard,faBox,faHeart,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function Searchbar(){
        const [input,setInput]=useState("");
        const [products,setProducts]=useState([]);
        const [filtered,setFiltered] = useState([]);
        useEffect(()=>{
            const fetchProducts =  async ()=>{
                const products = await fetch("https://fakestoreapi.com/products");
                const productsJson = await products.json();   
                setProducts(productsJson);
            }   
            fetchProducts(); 
        },[])
        useEffect(()=>{
            console.log(products);
            const filteredData = products.filter((item) => {
                   if(input!=""){
                        return Object.values(item).join('').toLowerCase().includes(input.toLowerCase())
                   }  
                })
                console.log(filteredData);
                setFiltered(filteredData); 
        },[input])
        return(
            <div className={styles.formContainer}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <form>
                        <input placeholder="Search" value ={input} onChange={(e)=>{setInput(e.target.value)}} className={styles.input} type="text" />
                    </form>
                    <div className={filtered.length==0?styles.resultContainerHidden:styles.resultContainerVisible}>
                        {filtered.map((item)=>(
                                <NavLink to={`/product/${item.id}`}>
                                    <div  className={styles.resultItem}>
                                        <span>{item.title}</span>
                                    </div>
                                </NavLink>
                        ))}
                    </div> 
            </div>
        )
}