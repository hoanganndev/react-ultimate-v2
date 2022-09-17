import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";

import { postLogin } from "../../services/apiService";
import { doLogin } from "../../Redux/action/actions";
import "./Auth.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    let res = await postLogin(email, password);
    if (res && res.EC === 0) {
      dispatch(doLogin(res));
      toast.success(res.EM);
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(res.EM);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container__header">
        <span>Don't have account yet ?</span>
        <button onClick={() => navigate("/register")}>Register now</button>
      </div>
      <div className="login-container__title col-4 mx-auto">Marcus dev</div>
      <div className="login-container__welcome col-4 mx-auto">Hello, who's this ?</div>
      <div className="login-container__content-form col-4 mx-auto">
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Please enter your email !"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Please enter your password !"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <span>Forgot your password ?</span>
        <div>
          <button
            className="btn-submit "
            disabled={isLoading}
            onClick={() => handleLogin()}
          >
            {isLoading && <FaSpinner className="loader-icon" />}
            <span>Login</span>
          </button>
        </div>
        <div className="text-center" onClick={() => navigate("/")}>
          <span className="back"> &#60; &#60; Go to home page</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
