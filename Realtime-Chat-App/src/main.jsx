import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "semantic-ui-css/semantic.min.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './components/Auth/Register/Register.jsx'
import Login from './components/Auth/Login/Login.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <App/>
      },
      {
        path: "login", 
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)