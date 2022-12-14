
import {createRoot} from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "./index.css";


import { Provider } from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {store} from "./admin/app/store";
import React from "react";


const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
