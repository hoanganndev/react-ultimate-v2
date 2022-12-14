import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "../App";
import Admin from "../components/Admin/Admin";
import Home from "../components/Home/HomePage";

//ADMIN
import DashBoard from "../components/Admin/Content/DashBoard";
import ManageUser from "../components/Admin/Content/ManageUser";
import Questions from "../components/Admin/Content/Question/Questions";
import ManageQuiz from "../components/Admin/Content/Quiz/ManageQuiz";

//AUTHEN
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

//USER
import DetailQuiz from "../components/User/DetailQuiz/DetailQuiz";
import ListQuiz from "../components/User/ListQuiz";

const NotFound = () => {
  return <div className="container mt-3 alert alert-warning">404 not found</div>;
};

const Layout = () => {
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
          <Route path="manage-questions" element={<Questions />} />
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
