import { Button } from "@mui/base";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { RiVideoLine } from "react-icons/ri";
import { LuMusic } from "react-icons/lu";
import { TfiBlackboard } from "react-icons/tfi";

export default function Navbar({ loggedIn, signOut }) {
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  function renderingLogic() {
    switch (location.pathname) {
      case "/mashboard":
        return false;
      case "/videos":
        return false;
      case "/audios":
        return false;
      default:
        return true;
    }
  }
  function gotoHome() {
    navigate("/");
  }
  return (
    <div className={isHomePage ? "navcontainer home" : "navcontainer other"}>
      <div className="nav">
        <div className="logo" onClick={() => gotoHome()}>
          <img
            src="/images/Mash_Highlight_Still.png"
            className="heroImage"
            alt=""
          />
        </div>
        {renderingLogic() ? (
          <div className="connect">
            {loggedIn ? (
              <Button className="button" onClick={() => signOut()}>
                Logout
              </Button>
            ) : (
              <Button className="button" onClick={() => navigate("/login")}>
                Connect
              </Button>
            )}
          </div>
        ) : (
          <div className="icons">
            <div
              className={`icon ${
                location.pathname === "/videos" ? "active" : ""
              }`}
              onClick={() => navigate("/videos")}
            >
              <div className="videos iconIcon">
                <RiVideoLine />
              </div>
              <div className="text">Visual Art</div>
            </div>
            <div
              className={`icon ${
                location.pathname === "/audios" ? "active" : ""
              }`}
              onClick={() => navigate("/audios")}
            >
              <div className="music iconIcon">
                <LuMusic />
              </div>
              <div className="text">Audio Tracks</div>
            </div>
            <div
              className={`icon ${
                location.pathname === "/mashboard" ? "active" : ""
              }`}
              onClick={() => navigate("/mashboard")}
            >
              <div className="mashboard iconIcon">
                <TfiBlackboard />
              </div>
              <div className="text">Mashboard</div>
            </div>
          </div>
        )}
      </div>
      <div className="divider"></div>
    </div>
  );
}
