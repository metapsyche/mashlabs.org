// MediaContext.js
import React, { createContext, useState } from "react";

export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [globalAudios, setGlobalAudios] = useState([]);
  const [globalVideos, setGlobalVideos] = useState([]);
  const [mediaView, setMediaView] = useState("audios");

  return (
    <MediaContext.Provider
      value={{
        globalAudios,
        setGlobalAudios,
        globalVideos,
        setGlobalVideos,
        mediaView,
        setMediaView,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
