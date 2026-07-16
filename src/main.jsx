import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { makeServer } from "./server/server";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Landing from "./pages/Landing.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Mashboard from "./pages/Mashboard.jsx";
import Premint from "./pages/Premint.jsx";
import Mint from "./pages/Mint.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import VisualLibrary from "./pages/VisualLibrary.jsx";
import AudioLibrary from "./pages/AudioLibrary.jsx";
import { MediaProvider } from "./context/MediaContext.jsx";
import TutorialOverlay from "./components/TutorialOverlay";
import Starter from "./pages/Starter.jsx";

// makeServer();

const App = () => {
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  useEffect(() => {
    const tutorialStatus = localStorage.getItem("tutorialCompleted");
    if (tutorialStatus === "true") {
      setTutorialCompleted(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    setTutorialCompleted(true);
    localStorage.setItem("tutorialCompleted", "true");
  };

  return (
    <MediaProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}
            <Route path="/" element={<Starter />}>
              {/* <Route index element={<Landing />} />
              
              <Route
                path="mashboard"
                element={
                  tutorialCompleted ? (
                    <Mashboard />
                  ) : (
                    <TutorialOverlay onComplete={handleTutorialComplete} />
                  )
                }
              /> */}
              {/* <Route path="videos" element={<VisualLibrary />} />
              <Route path="audios" element={<AudioLibrary />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="premint" element={<Premint />} />
              <Route path="mint" element={<Mint />} />
              <Route path="*" element={<ErrorPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </MediaProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
