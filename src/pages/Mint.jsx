import { Button } from "@mui/base";
import "./Mint.scss";
import { MashedPreview } from "./Mashboard";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShareSocial } from "react-share-social";
import LoaderDialog from "../components/LoaderDialog";
import { Base64 } from "js-base64";

export default function Mint() {
  const videoRef = useRef();
  const audioRef = useRef();
  const imageRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [selectedAudio, setSelectedAudio] = useState({});
  const [mashedVideo, setMashedVideo] = useState(""); 
  const [searchParams] = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const videoEncoded = searchParams.get("video");
    const audioEncoded = searchParams.get("audio");
    const videoURLencoded = searchParams.get("mashedVideo");

    if (videoEncoded && audioEncoded) {
      try {
        const decodedVideoStr = Base64.decode(decodeURIComponent(videoEncoded));
        const decodedAudioStr = Base64.decode(decodeURIComponent(audioEncoded));
        const parsedVideo = JSON.parse(decodedVideoStr);
        const parsedAudio = JSON.parse(decodedAudioStr);

        setSelectedVideo(parsedVideo);
        setSelectedAudio(parsedAudio);
        setMashedVideo(decodeURIComponent(videoURLencoded));
      } catch (err) {
        console.error("Error parsing base64 media objects:", err);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedVideo && selectedAudio) {
      if (imageRef.current) imageRef.current.src = selectedVideo.videoLink;
      if (videoRef.current) {
        videoRef.current.src = mashedVideo;
        videoRef.current.pause(); // Ensure the video is paused
      }

      // if (audioRef.current) {
      //   audioRef.current.src = selectedAudio.audioLink;
      //   audioRef.current.pause(); // Ensure the audio is paused
      // }
    }
    setPlaying(false);
  }, [selectedVideo, selectedAudio, mashedVideo]);

  useEffect(() => {
    if (playing) {
      if (videoRef.current) videoRef.current.play();
      // if (audioRef.current) audioRef.current.play();
    } else {
      if (videoRef.current) videoRef.current.pause();
      // if (audioRef.current) audioRef.current.pause();
    }
  }, [playing]);

  function togglePlayPause() {
    setPlaying((prevPlaying) => {
      const playing = !prevPlaying;
      return playing;
    });
  }

  function getRoyalty(price, royalty) {
    const result = (price * royalty) / 100;
    return parseFloat(result.toFixed(4));
  }

  function goBack() {
    navigate(`/`);
  }

  return (
    <div className="mintPage">
      <LoaderDialog
        message={"Please wait, your request is Processing"}
        open={loading}
      />
      <div className="content">
        <div className="heading">Congratulations!</div>
        <div className="subtext">
          You have successfully minted{" "}
          <span className="name">
            {selectedVideo?.title} <span className="x">x</span>
            {selectedAudio?.title}
          </span>{" "}
          for{" "}
          {selectedAudio?.price +
            selectedVideo?.price +
            getRoyalty(
              selectedAudio?.price + selectedVideo?.price,
              selectedVideo?.royalties + selectedAudio?.royalties
            )}{" "}
          ETH.
        </div>
        <div className="preview">
          <MashedPreview
            togglePlayPause={togglePlayPause}
            imageRef={imageRef}
            type={selectedVideo?.type}
            videoRef={videoRef}
            audioRef={audioRef}
            videoOnly={true}
            playing={playing}
          />
        </div>
        <div className="buttons">
          <Button
            className="mintbutton-mint cong"
            onClick={() => setDialogOpen(true)}
          >
            SHARE
          </Button>
          <a className="link" onClick={() => goBack()}>
            Back to collections
          </a>
        </div>
      </div>
      <ShareDialog
        isOpen={dialogOpen}
        closeDialog={() => setDialogOpen(false)}
      />
    </div>
  );
}

function ShareDialog({ isOpen, closeDialog }) {
  const style = {
    root: {
      background: "#23272a",
      borderRadius: 10,
      border: 0,
      boxShadow: "0 3px 5px rgba(0,0,0, .3)",
      color: "white",
    },
    copyContainer: {
      border: "2px solid gray",
      background: "#23272a",
      borderRadius: 10,
    },
    iconContainer: {
      paddingTop: "5px",
      display: "block",
      textAlign: "center",
    },
    title: {
      textAlign: "center",
      color: "white ",
      fontFamily: "Raleway",
      fontWeight: "500",
    },
  };
  const url = window.location.href;
  return (
    <div className={`dialog ${isOpen ? "visible" : ""}`}>
      <div className="clickableArea" onClick={() => closeDialog()}></div>
      <ShareSocial
        title="Share your #mashed collection with the world"
        url={url}
        socialTypes={[
          "twitter",
          "reddit",
          "facebook",
          "linkedin",
          "telegram",
          "email",
        ]}
        style={style}
      />
    </div>
  );
}
