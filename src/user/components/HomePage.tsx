import React, { Children, Component, HtmlHTMLAttributes } from "react";
import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";



const HomePageUser: React.FC = () => {
    return (
        <div>
            <Header/>
            
            <Footer/>
        </div>
    );
}

export default HomePageUser;