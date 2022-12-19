import SideBar from "../components/SideBar";
import HeaderMenu from "../components/Header";
import {useLocation} from 'react-router-dom';

import {Layout} from "antd";
import React, {useState} from "react";
import {Outlet} from "react-router";

const { Sider, Content, Header } = Layout;

const Dashboard: React.FC = () => {

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider breakpoint="xl" collapsible>
                <SideBar />
            </Sider>
            <Layout className="site-layout">
                <Header className="top-header z-10" style={{ display: 'flex',alignItems: 'center',justifyContent: 'flex-end'}}>
                    <HeaderMenu />
                </Header>
                <Content className="pt-5 pl-10 pr-10">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
