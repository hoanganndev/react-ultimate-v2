import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { postRegister } from "../../services/apiService";
import "./Auth.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.warning("Invalid email ...");
      return;
    }
    if (!password) {
      toast.warning("Please enter your password !");
      return;
    }
    let res = await postRegister(email, username, password);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="register-container__header">
        <span>Already have account ?</span>
        <button onClick={() => navigate("/login")}>Login now</button>
      </div>
      <div className="register-container__title col-4 mx-auto">Marcus dev</div>
      <div className="register-container__welcome col-4 mx-auto">Create new account</div>
      <div className="register-container__content-form col-4 mx-auto">
        <div className="form-group">
          <label htmlFor="">Email (*)</label>
          <input
            type="email"
            className="form-control"
            placeholder="Please enter your email !"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label htmlFor="">Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            placeholder="Please enter your password !"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {isShowPassword ? (
            <span className="icons-eye" onClick={() => setIsShowPassword(false)}>
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Please enter your username !"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <span>Forgot your password ?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Register to Marcus
          </button>
        </div>
        <div className="text-center" onClick={() => navigate("/")}>
          <span className="back"> &#60; &#60; Go to home page</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
