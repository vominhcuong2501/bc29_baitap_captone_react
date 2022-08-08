import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// const items = [
//   getItem("User Management", "1", <UserOutlined />),
//   getItem("Movie Management", "2", <DesktopOutlined />),
// ];

const items = [
  {
    label: (
      <Link
        style={{ textDecoration: "none" }}
        to="/admin/user-management"
        rel="noopener noreferrer"
      >
        <h2 style={{color: 'orange'}}>Disney</h2>
      </Link>
    ),
  },
  {
    label: (
      <Link
        style={{ textDecoration: "none" }}
        to="/admin/user-management"
        rel="noopener noreferrer"
      >
        User Management
      </Link>
    ),
    key: "user-management",
    icon: <UserOutlined />,
  },
  {
    label: (
      <Link
        style={{ textDecoration: "none" }}
        to="/admin/movie-management"
        rel="noopener noreferrer"
      >
        Movie Management
      </Link>
    ),
    key: "movie-management",
    icon: <DesktopOutlined />,
  },
  {
    label: (
      <Link
        style={{ textDecoration: "none" }}
        to="/admin/movie-management/show-time"
        rel="noopener noreferrer"
      >
        Show-times
      </Link>
    ),
    key: "show-times",
    icon: <FileOutlined />,
  },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          @VMC_BC29_CAPTONE_REACT_JS
        </Footer>
      </Layout>
    </Layout>
  );
}
