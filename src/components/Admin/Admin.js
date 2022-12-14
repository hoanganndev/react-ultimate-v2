import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import SideBar from "./SideBar";
import "./Admin.scss";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-content__header">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>

        <div className="admin-content__main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Admin;
