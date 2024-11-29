import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Error Page/ErrorPage';
import SignUp from './sign-up/SignUp';
import SignIn from './sign-in/SignIn';
import ProductDetails from './Productdetails/productDetails';
import MainLayout from './layout/MainLayout';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store';








const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout />,
    children: [
      {
        path:"",
        element:<App/>,
      },

      {
        path:"ProductDetails/:product_id",
        element:< ProductDetails/>,
      },
    ],
    errorElement: <ErrorPage/>
  },
  {
    path: "SignUp",
    element:<SignUp />,
  
  },
 
  {
    path: "/SignIn",
    element:<SignIn />,
  
  },
]);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    
 
);
