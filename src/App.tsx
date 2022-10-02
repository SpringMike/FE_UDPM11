import React from 'react';
import './App.css';
import {useRoutes} from 'react-router-dom';

import HomePage from "./admin/pages/home/HomePage";
import Dashboard from "./admin/components/Dashboard";
import SupplierList from "./admin/pages/supplier/SupplierList";
import SupplierDetails from "./admin/pages/supplier/SupplierDetails";

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
  ]);

  return router;
};

export default App;

