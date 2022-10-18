
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
import React from 'react';
import Header from './user/components/Header';

const App: React.FC = () => {
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
    },
    {
      path: 'user',
      element: <Header/>
    }
  ]);

  return router;
};

export default App;

