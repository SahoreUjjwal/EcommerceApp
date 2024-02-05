import { Navbar } from "./Components/Navbar/Navbar";
import {Login} from "./pages/Login/Login";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import {useAuth} from "./contexts/authContext";
import { Home } from "./pages/home/Home";
import { Cart } from "./pages/cart/Cart";
import { Orders } from "./pages/orders/Orders";
import   { ProductDetails} from "./pages/product/ProductDetails";  
function App() {
  const {user} = useAuth();
  const LoginPrivateroute=({children})=>{
    if(user){
        return <Navigate to="/" replace={true}/>
    }
    return children;
  }
  const LoggedInRoutes=({children})=>{
    if(!user){
      return <Navigate to="/Login" replace={true}/>
  }
   return children;
  }

  const routes = createBrowserRouter([
    {
      path:"/",
      element:<Navbar/>,
      children:[
        {
            index:true,element:(
              <Home/>
            )
        },{
          path:"product/:id",element:(
            <ProductDetails/>
          )
        },
        {path:"Login" , element:(
            <LoginPrivateroute>
              <Login/>
            </LoginPrivateroute>     
          )},
          {
            path:"SignUp" , element:(
              <LoginPrivateroute>
                <SignUp/>
              </LoginPrivateroute>   
            ) 
          },
          {
            path:"cart",element:(
              <LoggedInRoutes>
                <Cart/>
              </LoggedInRoutes>  
            )
          },
          {
            path:"orders",
            element:<Orders/>
           
          }
      ]
    }
  ])
   return (
    <>
       <RouterProvider router={routes}/>
       <ToastContainer/>
    </>
   
  )
}

export default App
