import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';

import HomePage from "./admin/pages/home/HomePage";
import Dashboard from "./admin/components/Dashboard";
import SupplierList from "./admin/pages/supplier/SupplierList";
import SupplierDetails from "./admin/pages/supplier/SupplierDetails";
import StaffList from './admin/pages/staff/StaffList';
import StaffDetails from './admin/pages/staff/StaffDetails';
import path from 'path';
import HomePageUser from './user/components/HomePage';

import Header from '../src/user/components/Header'; //Include Header
import Footer from '../src/user/components/Footer'; //Include Footer
import Home from '../src/user/components/Home'
import Shop from '../src/user/components/Shop'
import SingleProduct from '../src/user/components/SignleProduct'
import Checkout from '../src/user/components/Checkout'
import Cart from '../src/user/components/Cart'
import Login from '../src/user/components/Login'
import Signup from '../src/user/components/Signup'
import ForgotPassword from '../src/user/components/ForgotPassword'

const App: React.FC = () => {
  // <BrowserRouter>
  //   <Header></Header>
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //     <Route path="/shop" element={<Shop />} />
  //     <Route path="/single-product" element={<SingleProduct />} />
  //     <Route path="/checkout" element={<Checkout />} />
  //     <Route path="/cart" element={<Cart />} />
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/signup" element={<Signup />} />
  //     <Route path="/forgot-password" element={<ForgotPassword />} />
  //   </Routes>
  //   <Footer></Footer>
  // </BrowserRouter>
  // const dispatch = useDispatch();
  // dispatch(
  //     setUserStore({
  //       token: localStorage.getItem('token') || ''
  //     })
  // );
  const router = useRoutes([
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    {
      path: "/",
      element: <Dashboard />,

      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "supplier",
          children: [
            // {path: "add", element: <CategoryAdd/>},
            { path: "", element: <SupplierList /> },
            { path: "details/:id", element: <SupplierDetails /> },
          ],
        },

        {
          path: "staff",
          children: [
            // {path: "add", element: <CategoryAdd/>},
            { path: "", element: <StaffList /> },
            { path: "details/:id", element: <StaffDetails /> },
          ],
        },
        // {
        //   path: "coordinator/storage",
        //   children: [
        //     { path: "", element: <Storage /> },
        //     { path: "stock_transfers/:id", element: <Status /> },
        //     { path: "stock_transfers/create", element: <Create /> },
        //     { path: "stock_transfers/edit/:id", element: <Edit /> },
        //   ],
        // },
      ],
    },
    {
      path: "user",
      element: <Header />,
      children: [
        { path: "cart", element: <Cart /> }
      ],
    }

  ]);
  return router;
};

export default App;

