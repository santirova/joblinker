import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Root from './routes/root';
import ErrorPage from './errorPage';
import Applications from './routes/applications';
import Publications from './routes/publications';
import Stats from './routes/stats';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path: "/postulaciones",
        element: <Applications/>,
      },
      {
        path: "/publicaciones",
        element: <Publications/>,
      },
      {
        path: "/estadisticas",
        element: <Stats/>,
      }
    ]
    // children=[
    //   {
    //     path: "/postulaciones",
    //     element: <Applications/>,
    //   }
    // ]
  },
  // {
  //   path:"/postulaciones",
  //   element: <Applications/>
  // }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
