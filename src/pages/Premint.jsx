import { FaAngleLeft } from "react-icons/fa6";
import "./Premint.scss";
import { MashedPreview } from "./Mashboard";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/base";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoaderDialog from "../components/LoaderDialog";
import { collection1, collection2 } from "../server/data";
import { Base64 } from "js-base64";

function getRoyalty(price, royalty) {
  const result = (price * royalty) / 100;
  return parseFloat(result.toFixed(4));
}

export default function Premint() {
  const videoRef = useRef();
  const audioRef = useRef();
  const imageRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [selectedAudio, setSelectedAudio] = useState({});
  const [mashedVideo, setMashedVideo] = useState("");
  const [searchParams] = useSearchParams();
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

  function getFirstWord(str) {
    if (str) {
      const words = str.trim().split(/\s+/);
      return words[0] || "";
    }
  }
  function goBack(event) {
    event.preventDefault();
    navigate(`/mashboard`);
  }

  function mint() {
    const videoEncoded = searchParams.get("video");
    const audioEncoded = searchParams.get("audio");
    const videoURLencoded = searchParams.get("mashedVideo");
    const query = new URLSearchParams({
      video: videoEncoded,
      audio: audioEncoded,
      mashedVideo: videoURLencoded,
    });
    setLoading(true);
    setTimeout(() => {
      navigate(`/mint?${query.toString()}`);
    }, 2000);
  }

  return (
    <div className="premint">
      <LoaderDialog
        message={"Please wait, your request is Processing"}
        open={loading}
      />
      <div className="previewContainer">
        <div className="top">
          <a onClick={(e) => goBack(e)}>
            <FaAngleLeft size={20} />
            Back to editing
          </a>
        </div>
        <div className="content">
          <div className="topInfo">
            {/* <div className="mashedTitle">
              {collection?.videos[selectedVideo]?.title}{" "}
              <div className="x">x</div>
              {collection?.audios[selectedAudio]?.title}
            </div>
            <div className="userName">
              Masher: <span className="highlighted">Chrome King</span>
            </div> */}
          </div>
          <div className="preview">
            <MashedPreview
              togglePlayPause={() => togglePlayPause()}
              imageRef={imageRef}
              videoRef={videoRef}
              audioRef={audioRef}
              videoOnly={true}
              playing={playing}
            />
            <div className="otherInfo">
              <div className="mint">
                <Button className="mintbutton-mint" onClick={() => mint()}>
                  MINT
                </Button>
              </div>
              <div className="info">
                <div className="mashedTitle">
                  {selectedVideo?.title} <div className="x">x</div>
                  {selectedAudio?.title}
                </div>
                <div className="infoCard">
                  <div className="cardTitle">Current Price</div>
                  <div className="price">
                    {selectedVideo?.price + selectedAudio?.price} ETH
                  </div>
                  <div className="fees">
                    +{getRoyalty(selectedVideo?.price + selectedAudio?.price)}{" "}
                    ETH Mash fees
                  </div>
                </div>
                <div className="infoCard">
                  <div className="cardTitle">Owner Address</div>
                  <div className="address">dAckZ...Lxhs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="details">
        <ArtistCard
          type="visualArtist"
          avatar={selectedVideo?.thumbnail}
          title={selectedVideo?.title}
          artistName={selectedVideo?.artist}
          collectionName={selectedVideo?.title}
          price={selectedVideo?.price}
          royalty={selectedVideo?.royalties}
          charity={selectedVideo?.visualArtistCharity}
        />
        <ArtistCard
          type="musician"
          avatar={selectedAudio.art}
          title={selectedAudio?.title}
          artistName={selectedAudio.artist}
          collectionName={selectedAudio.title}
          price={selectedAudio?.price}
          royalty={selectedAudio.royalties}
          charity={selectedAudio.musicianCharity}
        />
      </div>
    </div>
  );
}

function ArtistCard({
  type,
  avatar,
  artistName,
  collectionName,
  title,
  price,
  royalty,
  charity,
}) {
  return (
    <div className="artistCard">
      <img src={avatar} alt="" />
      <div className="info">
        <div className="name">{title}</div>
        <div className="moreInfo">
          <div className="column">
            <div className="left">Title</div>
            <div className="columnRight">{title}</div>
          </div>
          <div className="column">
            <div className="left">
              {type == "musician" ? "Music Artist" : "Visual Artist"}
            </div>
            <div className="columnRight">{artistName}</div>
          </div>
          <div className="column">
            <div className="left">Collection</div>
            <div className="columnRight">{collectionName}</div>
          </div>
          <div className="column">
            <div className="left">List Price</div>
            <div className="columnRight">{price}</div>
          </div>
          <div className="column">
            <div className="left">Royalty Fee({royalty}%)</div>
            <div className="columnRight">{getRoyalty(price, royalty)} ETH</div>
          </div>
          <div className="column">
            <div className="left">Owner Address</div>
            <div className="columnRight">muMZ...sGsao</div>
          </div>
          <div className="column">
            <div className="left">Non-Profit Organization Supported</div>
            <div className="columnRight">{charity}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
