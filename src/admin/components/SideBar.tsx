import { AppstoreOutlined, ShopOutlined, TeamOutlined, } from "@ant-design/icons";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import WebIcon from '@mui/icons-material/Web';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
// import AddProduct from "../pages/product/AddProduct";
import "../styles/SideBar.css";
import { Dashboard, ImportExportOutlined } from "@mui/icons-material";
import React from "react";
import OrderPurchaseMananger from "../pages/manangerOrder/OrderPurchaseMananger";
import OrderReturnMananger from "../pages/manangerOrder/OrderReturnMananger";


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
    getItem("Thêm sản phẩm", "/products/add_product"),
    getItem("Danh sách sản phẩm", "/products"),
    getItem("Danh mục sản phẩm", "/categories"),
  ]),
  getItem("Hàng hoá", "sub2", <Dashboard />, [
    getItem("Nhập hàng", "purchase_orders", <ImportExportOutlined />),
  ]),
  getItem("Nhà cung cấp", "supplier", <ShopOutlined />),
  getItem("Nhân Viên", "staff", <TeamOutlined />),
  getItem("Kho hàng", "/inventories", <WarehouseIcon />),
  getItem("Website người dùng", "/home-user", <WebIcon />),
  getItem("Đơn hàng", "sub3", <AssignmentIcon />, [
    getItem("Đơn hàng", "order-manager",<AssignmentIcon />),
    getItem("Đơn yêu cầu trả", "order-return-manager",<AssignmentReturnIcon />),
  ]),
  getItem("Báo cáo", "/tracking", <TeamOutlined />),

  getItem("Đăng xuất", "/login", <LogoutIcon />),
];

const SideBar: React.FC = () => {
  // const user = useSelector((state: RootState) => state?.user)

  // const roles = useSelector((state: RootState) => state?.user?.authorities);
  // // console.log(roles);

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
          // style={{ width: 256 }}
          mode="inline"
          theme="dark"
          items={items}
          onClick={(e) => {
            navigate(e.key, { replace: true })
          }}
        />
      </div>
      {/* </div> */}
    </>
  );
};

export default SideBar;