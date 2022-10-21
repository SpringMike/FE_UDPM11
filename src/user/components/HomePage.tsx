import React, {Children, Component, HtmlHTMLAttributes, useEffect, useState} from "react";
import Cart from "./Cart";
import Footers from "./Footer";
import Headers from "./Header";
import Home from "./Home";
import {Layout} from "antd";
import {Outlet, useLocation} from "react-router-dom";
const {Content, Footer} = Layout;


const HomePageUser: React.FC = () => {
    const [component, setComponent] = useState(<Outlet/>);

    return (
        <Layout>
            <Headers/>
            <Layout>
                <Content>
                    <>
                        {component}
                    </>
                </Content>
            </Layout>
            <Footer>
                <Footers></Footers>
            </Footer>
        </Layout>
    );
}

export default HomePageUser;