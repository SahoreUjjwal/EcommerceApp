import { Navbar } from "./Components/Navbar/Navbar";
import {Login} from "./pages/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
function App() {
  const routes = createBrowserRouter([
    {
      path:"/",
      element:<Navbar/>,
      children:[
        {path:"Login" , element:<Login/>}
      ]
    }
  ])
   return (
    <RouterProvider router={routes}/>
  )
}

export default App
