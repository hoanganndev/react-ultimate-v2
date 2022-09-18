import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import video from "../../assets/video-homepage.mp4";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="content-header">There's a better way to ask</div>
        <div className="content-main">
          You don't want to make a boring form. And your audience won't answer one. Create
          a typeform instead—and make everyone happy.
        </div>
        <div className="content-button">
          {isAuthenticated ? (
            <button onClick={() => navigate("/users")}>Doing quiz now</button>
          ) : (
            <button onClick={() => navigate("/login")}>Get started - it's free</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
