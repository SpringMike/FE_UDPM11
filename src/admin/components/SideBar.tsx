import {AppstoreOutlined, ShopOutlined, TeamOutlined,} from "@ant-design/icons";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import {Menu} from "antd";
import type {MenuProps} from "antd/es/menu";
import {useNavigate} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
// import AddProduct from "../pages/product/AddProduct";
import "../styles/SideBar.css";
import React from "react";

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

const items: MenuItem[] = [
  // getItem("Đơn vị vận chuyển", "/transport-companies", <LocalShippingIcon />),

  getItem("Quản lý sản phẩm", "sub1", <AppstoreOutlined />, [
    getItem("Thêm sản phẩm", "/product_add"),
    getItem("Danh sách sản phẩm", "/products"),
    getItem("Danh mục sản phẩm", "/categories"),
  ]),
    getItem("Nhà cung cấp", "supplier", <ShopOutlined />),

    getItem("Đăng xuất", "/login", <LogoutIcon />),
];

const SideBar: React.FC = () => {
  // const user = useSelector((state: RootState) => state?.user)
  // // @ts-ignore
  // const roles = useSelector((state: RootState) => state?.user?.authorities);
  // // console.log(roles);

  const navigate = useNavigate();

  return (
      // <div className="side-bar">
      <>
        <div className="side-bar__brand-logo">
          <a href="/home">
            <img
                className="img-fill"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawhnJ_lVjWONmK3EUGr7SRoxZc_q7RkjkjQ&usqp=CAU"
                alt="logo"
            />
          </a>
        </div>

        <div className="side-bar_menu">
          <Menu
              // style={{ width: 256 }}
              mode="inline"
              theme="dark"
              items={items}
              onClick={(e) => {
                navigate(e.key, {replace: true})
              }}
          />
        </div>
        {/* </div> */}
      </>
  );
};

export default SideBar;