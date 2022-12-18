import {AppstoreOutlined, ShopOutlined, TeamOutlined,} from "@ant-design/icons";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import {Menu} from "antd";
import type {MenuProps} from "antd/es/menu";
import {useNavigate} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import WebIcon from '@mui/icons-material/Web';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
// import AddProduct from "../pages/product/AddProduct";
import "../styles/SideBar.css";
import {Dashboard, ImportExportOutlined} from "@mui/icons-material";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {BarChartOutlined} from "@material-ui/icons";


type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const MENUS: MenuItem[] = [
    // getItem("Đơn vị vận chuyển", "/transport-companies", <LocalShippingIcon />),

    getItem("Quản lý sản phẩm", "product", <AppstoreOutlined/>, [
        getItem("Thêm sản phẩm", "products/add_product"),
        getItem("Danh sách sản phẩm", "/products"),
        getItem("Danh mục sản phẩm", "/#"),
    ]),
    getItem("Hàng hoá", "", <Dashboard/>, [
        getItem("Nhập hàng", "purchase_orders", <ImportExportOutlined/>),
    ]),
    getItem("Nhà cung cấp", "supplier", <ShopOutlined/>),
    getItem("Nhân Viên", "admin/staff", <TeamOutlined/>),
    getItem("Kho hàng", "inventories", <WarehouseIcon/>),
    getItem("Website người dùng", "home-user", <WebIcon/>),
    getItem("Đơn hàng", "order", <AssignmentIcon/>, [
        getItem("Đơn hàng", "order-manager", <AssignmentIcon/>),
        getItem("Đơn yêu cầu trả", "order-return-manager", <AssignmentReturnIcon/>),
    ]),
    getItem("Báo cáo", "statistic", <BarChartOutlined/>, [
        getItem("Thống kê doanh thu", "/admin/tracking", <TeamOutlined/>),
        getItem("Thống kê", "/admin/statistics", <BarChartOutlined />),

    ]),
    getItem("Đăng xuất", "/login", <LogoutIcon/>),
];
const MENUUSER: MenuItem[] = [
    // getItem("Đơn vị vận chuyển", "/transport-companies", <LocalShippingIcon />),

    getItem("Quản lý sản phẩm", "product", <AppstoreOutlined/>, [
        getItem("Thêm sản phẩm", "products/add_product"),
        getItem("Danh sách sản phẩm", "/products"),
        getItem("Danh mục sản phẩm", "/#"),
    ]),
    getItem("Hàng hoá", "", <Dashboard/>, [
        getItem("Nhập hàng", "purchase_orders", <ImportExportOutlined/>),
    ]),
    getItem("Nhà cung cấp", "supplier", <ShopOutlined/>),
    getItem("Kho hàng", "inventories", <WarehouseIcon/>),
    getItem("Website người dùng", "home-user", <WebIcon/>),
    getItem("Đơn hàng", "order", <AssignmentIcon/>, [
        getItem("Đơn hàng", "order-manager", <AssignmentIcon/>),
        getItem("Đơn yêu cầu trả", "order-return-manager", <AssignmentReturnIcon/>),
    ]),
    getItem("Đăng xuất", "/login", <LogoutIcon/>),
];

const SideBar: React.FC = () => {
    const userRoles = useSelector((state: RootState) => state?.user?.authorities);
    const user = useSelector((state: RootState) => state?.user);
    console.log(user);

    const navigate = useNavigate();

    return (
        // <div className="side-bar">
        <>
            <div className="side-bar__brand-logo">
                <a href="/dashboard">
                    <img
                        className="img-fill"
                        src="https://seeklogo.com/images/1/shop-logo-C0083F2CCF-seeklogo.com.png"
                        alt="logo"
                    />
                </a>
            </div>

            <div className="side-bar_menu">
                <Menu
                    mode="inline"
                    theme="dark"
                    items={userRoles?.includes("admin") ? MENUS : MENUUSER}
                    onClick={(e) => {
                        if (e.key.includes("login")) {
                            localStorage.removeItem("token");
                        }
                        navigate(`${e.key}`, {replace: true});
                    }}
                />
            </div>
            {/* </div> */}
        </>
    );
};

export default SideBar;