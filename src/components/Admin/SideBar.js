import { AiFillDashboard } from "react-icons/ai";
import { DiAptana } from "react-icons/di";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";

import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";

import sidebarBg from "../../assets/bg.jpg";
import "./SideBar.scss";

const SideBar = props => {
  const navigate = useNavigate();
  const { collapsed, toggled, handleToggleSidebar } = props;

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <RiAdminLine size={"2em"} /> <span>Admin</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<AiFillDashboard />}>
              Dashboard
              <Link to="/admins" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu title="Features" icon={<DiAptana />}>
              <MenuItem>
                Quản lý users
                <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>
                Quản lý bài quiz
                <Link to="/admins/manage-quizzes" />
              </MenuItem>
              <MenuItem>
                Quản lý câu hỏi
                <Link to="/admins/manage-questions" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/hoanganndev"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Marcus Dev
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
