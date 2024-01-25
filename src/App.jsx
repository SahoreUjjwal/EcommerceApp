import { Navbar } from "./Components/Navbar/Navbar";
import {Login} from "./pages/Login/Login";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import {useAuth} from "./contexts/authContext";


function App() {
  const {user} = useAuth();
  const Privateroute=({children})=>{
    if(user){
        return <Navigate to="/" replace={true}/>
    }
    return children;
  }
  const routes = createBrowserRouter([
    {
      path:"/",
      element:<Navbar/>,
      children:[
        {path:"Login" , element:(
            <Privateroute>
              <Login/>
            </Privateroute>     
          )},
          {
            path:"SignUp" , element:(
              <Privateroute>
                <SignUp/>
              </Privateroute>   
            ) 
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
