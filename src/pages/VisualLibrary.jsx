import React, { useContext, useEffect, useState } from "react";
import "./Library.scss";
import { MediaCard } from "./Profile";
import { MediaContext } from "../context/MediaContext";
import { artists, dataVideos } from "../server/data";
import { Link } from "react-router-dom";
export default function VisualLibrary() {
  const {
    globalAudios,
    setGlobalAudios,
    globalVideos,
    setGlobalVideos,
    setMediaView,
  } = useContext(MediaContext);
  const sections = [
    {
      name: "All",
      id: "All",
    },
    {
      name: "Artists",
      id: "Artists",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("All");
  const [videos, setVideos] = useState([]);

  const [realArtists, setRealArtists] = useState([]);

  useEffect(() => {
    fetch("https://api.mashlabs.xyz/artists")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.error) return;
        setRealArtists(data);
      })
      .catch((error) => {
        console.error(error);
      });
    setVideos(dataVideos);
  }, []);

  function addVideo(video) {
    console.log("adding video");
    setGlobalVideos((oldvideos) => {
      setMediaView("videos");
      const isAlreadyAdded = oldvideos.some(
        (existingVideo) => existingVideo.id === video.id
      );
      console.log(isAlreadyAdded);
      if (!isAlreadyAdded) {
        return [...oldvideos, video];
      }
      return oldvideos;
    });
  }

  return (
    <div className="library">
      <div className="library-title">Explore Visuals</div>
      <div className="options">
        {sections.map((section, index) => {
          return (
            <div
              key={index}
              className={`option ${
                selectedOption == section.id ? "selectedOption" : ""
              }`}
              onClick={() => setSelectedOption(section.id)}
            >
              {section.name}
            </div>
          );
        })}
      </div>
      <div className="separator"></div>
      <div className="content">
        {selectedOption == "All" ? (
          <div className="container">
            {videos.map((video, index) => {
              return (
                <MediaCard
                  key={index}
                  img={video.thumbnail}
                  title={video.title}
                  subtitle={video.artist}
                  fullVisibility={true}
                  addMedia={() => addVideo(video)}
                />
              );
            })}
          </div>
        ) : selectedOption == "Artists" ? (
          <div className="container">
            {realArtists?.concat(artists).map((artist, index) => {
              return (
                <Link
                  key={index}
                  to={artist.id ? "/profile/" + artist.id : "/"}
                  className="mediacardAnchor"
                >
                  <MediaCard
                    title={artist.name}
                    subtitle={artist?.location?.city || "NYC"}
                    img={artist.profilepicture}
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="content"></div>
        )}
      </div>
    </div>
  );
}
