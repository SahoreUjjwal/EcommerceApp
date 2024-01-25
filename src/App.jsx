import { Navbar } from "./Components/Navbar/Navbar";
import {Login} from "./pages/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
function App() {
  const routes = createBrowserRouter([
    {
      path:"/",
      element:<Navbar/>,
      children:[
        {path:"Login" , element:(
            <AuthContext>
              <Login/>
            </AuthContext>
          )}
      ]
    }
  ])
   return (
    <RouterProvider router={routes}/>
  )
}

export default App
