import React, {Children, Component, HtmlHTMLAttributes, useEffect, useState} from "react";
import Cart from "./Cart";
import Footers from "./Footer";
import Headers from "./Header";
import Home from "./Home";
import {Layout} from "antd";
import {Outlet, useLocation} from "react-router-dom";
const {Content, Footer} = Layout;


const HomePageUser: React.FC = () => {
    return (
        <Layout>
            <Headers/>
            <Layout>
                <Content>
                    <div >
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
            <Footer>
                <Footers></Footers>
            </Footer>
        </Layout>
    );
}

export default HomePageUser;