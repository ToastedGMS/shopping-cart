/* eslint-disable react/react-in-jsx-scope */
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import Shop from "./Shop"

const router = createBrowserRouter([
  {path: "/", element: <Home/> }, 
  {path: "shop", element: <Shop/>}])
function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
