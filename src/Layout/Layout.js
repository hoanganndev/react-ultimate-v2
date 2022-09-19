import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "../App";
import Admin from "../components/Admin/Admin";
import DashBoard from "../components/Admin/Content/DashBoard";
import ManageUser from "../components/Admin/Content/ManageUser";
import ManageQuiz from "../components/Admin/Content/Quiz/ManageQuiz";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Home from "../components/Home/HomePage";
import DetailQuiz from "../components/User/DetailQuiz/DetailQuiz";
import ListQuiz from "../components/User/ListQuiz";

const NotFound = () => {
  return <div className="container mt-3 alert alert-warning">404 not found</div>;
};

const Layout = props => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="users" element={<ListQuiz />} />
        </Route>
        <Route path="admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
        </Route>
        <Route path="quiz/:id" element={<DetailQuiz />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Layout;
