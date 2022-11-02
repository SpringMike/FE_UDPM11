import './App.css';
import { useRoutes } from 'react-router-dom';

import HomePage from "./admin/pages/home/HomePage";
import Dashboard from "./admin/components/Dashboard";
import SupplierList from "./admin/pages/supplier/SupplierList";
import SupplierDetails from "./admin/pages/supplier/SupplierDetails";
import StaffList from './admin/pages/staff/StaffList';
import StaffDetails from './admin/pages/staff/StaffDetails';
import ListImportInvoice from "./admin/pages/importInvoice/ListImportInvoice";
import CreateImport from "./admin/pages/importInvoice/CreateImport";
import DetailImportInvoice from "./admin/pages/importInvoice/DetailImportInvoice";
import CreateReturnImportInvoice from "./admin/pages/importInvoice/CreateReturnImportInvoice";
import InventoryManager from "./admin/pages/inventory/InventoryManager";
import InventoryList from "./admin/pages/inventory/InventoryList";
import AddProduct from "./admin/pages/product/AddProduct";
import React from 'react';
import Header from './user/components/Header';

// user
import HomePageUser from "./user/components/HomePage";
import Checkout from "./user/components/Checkout";
import Login from "./user/components/Login";
import SignUp from "./user/components/Signup";
import ForgotPassword from "./user/components/ForgotPassword";
import Cart from "./user/components/Cart";
import Home from "./user/components/Home";
import Shop from "./user/components/Shop";
import SignleProduct from "./user/components/SignleProduct";
import { useAuthStore } from './hooks/zustand/auth';

const App: React.FC = () => {
    // const dispatch = useDispatch();
    // dispatch(
    //     setUserStore({
    //       token: localStorage.getItem('token') || ''
    //     })
    // );
    const role = useAuthStore((state) => state.role)
    let routes;
    console.log(role);
    switch (role) {
        case 'user':
            routes = [
                {
                    path: "/",
                    element: <HomePageUser />,
                    children: [
                        {
                            path: "/",
                            element: <Home />,
                        },
                        {
                            path: "home-user",
                            element: <Home />,
                        },
                        {
                            path: "shop",
                            element: <Shop />,
                        },
                        {
                            path: "checkout",
                            element: <Checkout />,
                        },
                        {
                            path: "signup",
                            element: <SignUp />,
                        },
                        {
                            path: "forgot-password",
                            element: <ForgotPassword />,
                        },
                        {
                            path: "cart",
                            element: <Cart />,
                        },
                        {
                            path: "single-product/:id",
                            element: <SignleProduct />,
                        },
                    ],
                }]
            break;
        case 'admin':
            routes = [
                {
                    path: "/",
                    element: <Dashboard />,

                    children: [
                        {
                            path: "dashboard",
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
                        {
                            path: "purchase_orders",
                            children: [
                                // {path: "add", element: <CategoryAdd/>},
                                { path: "", element: <ListImportInvoice /> },
                                { path: "create", element: <CreateImport /> },
                                { path: "details/:code", element: <DetailImportInvoice /> },
                                { path: "return/:code", element: <CreateReturnImportInvoice /> },
                            ],
                        },
                        {
                            path: "/inventories/:id",
                            element: <InventoryManager />,
                        },
                        {
                            path: "/inventories",
                            element: <InventoryList />,
                        },
                        {
                            path: "/add_product",
                            element: <AddProduct />,
                        },
                    ],
                }]
            break;
        case 'anonymous':
            routes = [
                {
                    path: "/login",
                    element: <Login />,
                }]
            break;
    }
    return useRoutes(routes)
};

export default App;

