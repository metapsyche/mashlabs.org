import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Layout.scss";
import { app } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import MediaSelectorWidget from "../components/MediaSelectionWidget";

export default function Layout() {
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth(app);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);
  return (
    <div>
      <div className="layoutMain">
        <div className="layoutContent">
          <Navbar loggedIn={loggedIn} signOut={() => auth.signOut()} />
          <MediaSelectorWidget/>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

