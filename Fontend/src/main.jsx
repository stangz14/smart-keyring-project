import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//contens
import Login from './Contents/Login'
import Profile from './Contents/Profile'
import Register from './Contents/rigister'
import Index from './Contents/index'
import Accident from './Contents/Accident'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/accident",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Index />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
