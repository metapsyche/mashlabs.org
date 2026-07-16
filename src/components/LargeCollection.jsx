import { Button } from "@mui/base";
import Tag from "./Tag";
import "./LargeCollection.scss";
import "./Collection.css";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";

export default function LargeCollection({ data }) {
  return (
    <div className="largeCollection">
      <div className="featured">Featured Collection</div>
      <div className="collectionName">{data.name}</div>
      <div className="br"></div>
      <div className="collectionMain">
        <div className="artContainer">
          <LargeCollectionTeaser
            videoUrl={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
            }
            audioUrl={"audio/sintela.mp3"}
          />
        </div>
        <div className="description">
          <div className="descContent">
            This is the story of a woman who embarks on a quest to find her lost
            dragon companion.
            <br />
            <br /> Through flashbacks, their bond is revealed, but the young
            dragon is later captured by an adult dragon.
            <br />
            <br /> As our heroin is determined to rescue him, she confronts the
            dragon but tragically comes to find she made a fatal mistake. The
            film explores themes of loyalty, loss, and the consequences of
            obsession...{" "}
          </div>
          <span className="learnMore">
            <a target="_blank" href={data.learnMoreLink}>
              learn more
            </a>
          </span>
          <div className="openCollection">
            <div className="collectionMint">
              {data.mashesLeft || "X"}/{data.totalMashes || "XXX"}
            </div>
            <Button className="button widebutton orange">EXPLORE</Button>
          </div>
        </div>
      </div>
      <div className="moreInfo">
        <ArtistInfo
          name={data.visualArtist}
          avatar={data.visualArtistAvatar}
          type={"Visual Artist"}
          city={data.visualArtistCity}
          country={data.visualArtistCountryAbbriviation}
          description={data.visualArtistDescription}
          tags={data.visualArtistTags}
        />
        <ArtistInfo
          name={data.musician}
          avatar={data.musicianAvatar}
          type={"Music Artist"}
          city={data.musicianCity}
          country={data.musicianCountryAbbriviation}
          description={data.musicianDescription}
          tags={data.musicanTags}
        />
      </div>
    </div>
  );
}

function LargeCollectionTeaser({ videoUrl, audioUrl }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function togglePlayPause() {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      playing ? videoRef.current.play() : videoRef.current.pause();
    }
    if (audioRef.current) {
      playing ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Wait until the metadata is loaded to set the currentTime
      const handleLoadedMetadata = () => {
        video.currentTime = 280;
        // video.play(); // Optionally play the video after setting the time
        // setPlaying(true);
      };
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  return (
    <div className="teaserContainer">
      <video
        ref={videoRef}
        className="teaserVideo"
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
      />
      <audio
        ref={audioRef}
        src={audioUrl}
        className="audio"
        loop
        autoPlay
      ></audio>
      <div
        className={`clickable ${!playing ? "darken" : ""}`}
        onClick={() => togglePlayPause()}
      >
        <div className="playpause" onClick={() => togglePlayPause()}>
          {playing ? "" : <FaPlay />}
        </div>
      </div>
    </div>
  );
}

function ArtistInfo({ city, country, name, avatar, description, tags, type }) {
  return (
    <div className="artistInfo">
      <div className="artistInfoAvatar">
        <img src={avatar} alt="" className="" />
      </div>
      <div className="artistDetails">
        <div className="artist-musician">
          <div className="name">{name}</div>
          <div className="artistType">{type}</div>
        </div>
        <div className="artistCountry">
          {city}, {country}
        </div>
        <div className="tags">
          {tags.map((tag, index) => (
            <Tag content={tag} key={index} />
          ))}
        </div>
        <div className="artistDesc">{description}</div>
      </div>
    </div>
  );
}
