import SideBar from "../components/SideBar";
import {Outlet, useLocation} from "react-router-dom";
import {Layout} from "antd";
import React from "react";
const {Sider, Content, Header} = Layout;


const Dashboard: React.FC = () => {
    return (
        <Layout style={{height: "100vh"}}>
            <Sider breakpoint="xl" collapsible>
                <SideBar/>
            </Sider>
            <Layout className="site-layout">
                {!useLocation().pathname.includes("stock_transfers") && (
                    <Header className="top-header z-10"
                        // style={{ padding: 0,boxShadow: "1px 0px 5px 1px black" }}
                    >
                        {/*<HeaderMenu />*/}
                    </Header>
                )}
                <Content>
                    <div style={{padding: 20}}>
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;