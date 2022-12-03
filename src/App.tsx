import './App.css';
import {useRoutes} from 'react-router-dom';

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
import OrderPurchaseMananger from './admin/pages/manangerOrder/OrderPurchaseMananger';
import OrderReturnMananger from './admin/pages/manangerOrder/OrderReturnMananger';
import ReportPage from "./admin/pages/revenue/ReportPage";
import RevenueDetailChart from "./admin/pages/revenue/RevenueDetailChart";
import ListProduct from "./admin/pages/product/ListProduct";
import ProductDetails from "./admin/pages/product/ProductDetails";
import React from "react";
import {useDispatch} from "react-redux";
import {setUserStore} from "./admin/features/user/userSlice";
import Login from "./admin/pages/Login";

const App: React.FC = () => {
    const dispatch = useDispatch();
    dispatch(
        setUserStore({
            token: localStorage.getItem('token') || ''
        })
    );
    return useRoutes([
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/",
            element: <Dashboard/>,
            children: [
                {
                    path: "dashboard",
                    element: <HomePage/>,
                },
                {
                    path: "supplier",
                    children: [
                        // {path: "add", element: <CategoryAdd/>},
                        {path: "", element: <SupplierList/>},
                        {path: "details/:id", element: <SupplierDetails/>},
                    ],
                },


                {
                    path: "/admin/staff",
                    children: [
                        // {path: "add", element: <CategoryAdd/>},
                        {path: "", element: <StaffList/>},
                        {path: "details/:id", element: <StaffDetails/>},
                    ],
                },
                {
                    path: "purchase_orders",
                    children: [
                        // {path: "add", element: <CategoryAdd/>},
                        {path: "", element: <ListImportInvoice/>},
                        {path: "create", element: <CreateImport/>},
                        {path: "details/:code", element: <DetailImportInvoice/>},
                        {path: "return/:code", element: <CreateReturnImportInvoice/>},
                    ],
                },
                {
                    path: "/inventories/:id",
                    element: <InventoryManager/>,
                },
                {
                    path: "/admin/tracking/",
                    element: <ReportPage/>,
                },
                {
                    path: "/admin/tracking/detail/revenue",
                    element: <RevenueDetailChart/>,
                },
                {
                    path: "/inventories",
                    element: <InventoryList/>,
                },
                {
                    path: "/products",
                    children: [
                        {
                            path: "add_product",
                            element: <AddProduct/>,
                        },
                        {index: true, element: <ListProduct/>},
                        {path: ":id", element: <ProductDetails/>},

                    ],
                },
                {
                    path: "/order-manager",
                    element: <OrderPurchaseMananger/>,
                },
                {
                    path: "/order-return-manager",
                    element: <OrderReturnMananger/>,
                }
            ]
        }
    ])
};

export default App;

