import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './firebaseConfig.jsx';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registion from './Pages/Registion/Registion.jsx';
import Login from './Pages/Login/Login.jsx';
import Home from './Pages/HomePage/Home.jsx';
import { Forgetpass } from './Pages/ForgetPassword/Forgetpass.jsx';

import { store } from './store'
import { Provider } from 'react-redux'
import Message from './component/Saidebar/Mesage/Message.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
  },
  {
    path: "/forgotpassword",
    element: <Forgetpass></Forgetpass>,
  },
  
  {
    path: "/registison",
    element: <Registion></Registion>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/message",
    element: <Message></Message>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  
<Provider store={store}>
<RouterProvider router={router} />
  </Provider>




   
  </React.StrictMode>,
)
