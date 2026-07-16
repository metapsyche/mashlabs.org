import React, { useContext, useEffect, useState } from "react";
import "./Library.scss";
import { MediaCard } from "./Profile";
import { MediaContext } from "../context/MediaContext";
import { artists, dataAudios } from "../server/data";
import { Link } from "react-router-dom";
export default function AudioLibrary() {
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
  const [audios, setAudios] = useState([]);
  const [realArtists, setRealArtists] = useState([]);

  function addAudio(audio) {
    setGlobalAudios((oldAudios) => {
      setMediaView("audios");
      const isAlreadyAdded = oldAudios.some(
        (existingAudio) => existingAudio.id === audio.id
      );
      if (!isAlreadyAdded) {
        return [...oldAudios, audio];
      }
      return oldAudios;
    });
  }

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
    setAudios(dataAudios);
  }, []);
  return (
    <div className="library">
      <div className="library-title">Explore Audio</div>
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
            {audios.map((audio) => {
              return (
                <MediaCard
                  key={audio.id}
                  img={audio.art}
                  title={audio.title}
                  subtitle={audio.artist}
                  addMedia={() => addAudio(audio)}
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
