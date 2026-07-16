import { Button } from "@mui/base";
import { useEffect, useRef, useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Tag from "./Tag";

import "./CompactCollection.scss";
import "./Collection.css";
import { useNavigate } from "react-router-dom";
import { FullArt } from "./FullArt";

export default function CompactCollection({ data, playing, setPlaying }) {
  const navigate = useNavigate();
  return (
    <div className="compactCollection">
      <div className="artistMusicianCompact">
        <Artist
          name={data.visualArtist}
          location={
            data.visualArtistCity + ", " + data.visualArtistCountryAbbriviation
          }
          avatar={data.videoUrl ? data.videoUrl : data.visualArtistAvatar}
          tags={data.visualArtistTags}
          video={data.videoUrl ? true : false}
          fullVisibility={true}
        />
        {/* <div className="x">
          <div>x</div>
          <div className="details"></div>
        </div> */}
        <Artist
          name={data.musician}
          location={data.musicianCity + ", " + data.musicianCountryAbbriviation}
          avatar={data.musicianAvatar}
          tags={data.musicanTags}
          audio={data.audioLink}
          playing={playing}
          setPlaying={setPlaying}
        />
      </div>
      <div className="right">
        <div className="openCollectionCompact">
          <Button
            className="button widebutton orange"
            onClick={() =>
              navigate("mashboard?collection=" + data.collectionId)
            }
          >
            EXPLORE
          </Button>
          <div className="collectionMint">
            {data.mashesLeft || "X"}/{data.totalMashes || "XXX"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Artist({
  name,
  location,
  avatar,
  tags,
  video,
  audio,
  playing,
  setPlaying,
  fullVisibility
}) {
  const audioRef = useRef(null);
  const [fullArtVisible, setFullArtVisible] = useState(false);

  const handleImageClick = () => {
    console.log(fullVisibility);
    if (fullVisibility && !audio) {
      setFullArtVisible(true);
      return;
    }
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }
    if (playing) {
      audioElement.currentTime = 0;
      audioElement.play();
    } else if (!playing) {
      if (!audioElement.paused) {
        audioElement.pause();
      }
    }
  }, [playing]);

  return (
    <div className="artist">
      <FullArt
        type={video ? "video" : "image"}
        src={avatar}
        visible={fullArtVisible}
        setVisible={setFullArtVisible}
      />
      <div className="artistImage" onClick={handleImageClick}>
        {video ? (
          <video
            src={avatar}
            className="artistAvatar"
            autoPlay
            muted
            loop
          ></video>
        ) : (
          <img src={avatar} alt="" className="artistAvatar" />
        )}
        {!video && audio && (
          <div className="speakerIcon">
            {playing ? (
              <HiSpeakerWave size={14} />
            ) : (
              <HiSpeakerXMark size={14} />
            )}
          </div>
        )}
      </div>
      <div className="details">
        <div className="compactArtistName">
          <div className="name">{name}</div>
          <div className="location">{location}</div>
        </div>
        <div className="tags">
          {tags.map((tag, index) => (
            <Tag content={tag} key={index} />
          ))}
        </div>
      </div>
      <div className="hidden">
        <audio
          ref={audioRef}
          src={audio ? audio : ""}
          className="audioElement"
        ></audio>
      </div>
    </div>
  );
}
