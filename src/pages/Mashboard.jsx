import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./Mashboard.scss";
import { GoDotFill } from "react-icons/go";
import Separator from "../components/Separator";
import { Button } from "@mui/base";
import { Slider } from "@mui/base/Slider";
import ScrollableContainer from "../components/ScrollableContainer";
import { AudioCard, EmptyCard, VisualCard } from "../components/Card";
import { useContext, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaAngleLeft } from "react-icons/fa6";
import LoaderDialog from "../components/LoaderDialog";
import { collection1, collection2 } from "../server/data";
import { MediaContext } from "../context/MediaContext";
import { Base64 } from "js-base64";

export default function Mashboard() {
  const { globalAudios, setGlobalAudios, globalVideos, setGlobalVideos } =
    useContext(MediaContext);
  const videoRef = useRef();
  const imageRef = useRef();
  const audioRef = useRef();
  const [selectedAudio, setSelectedAudio] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [collection, setCollection] = useState(null);
  const [audios, setAudios] = useState([]);
  const [videos, setVideos] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collection");
  const navigate = useNavigate();

  useEffect(() => {
    if (collectionId == 1) {
      fetch("/api/collections")
        .then((res) => res.json())
        .then((collections) => {
          const data = collections[0];
          console.log(data);
          setGlobalAudios([data.audios[0], data.audios[1]]);
          setGlobalVideos([data.videos[0]]);
        });
    } else if (collectionId == 2) {
      setGlobalAudios(collection2.audios);
      setGlobalVideos(collection2.videos);
    } else {
    }
  }, []);

  useEffect(() => {
    setAudios(globalAudios);
  }, [globalAudios]);
  useEffect(() => {
    setVideos(globalVideos);
  }, [globalVideos]);

  useEffect(() => {
    if (audios && videos) {
      if (audioRef.current)
        audioRef.current.src = audios[selectedAudio]?.audioLink;
      if (audios[selectedAudio]?.startAt) {
        audioRef.current.currentTime = audios[selectedAudio]?.startAt;
      }
      if (imageRef.current)
        imageRef.current.src = videos[selectedVideo]?.videoLink;
      if (videoRef.current) {
        videoRef.current.src = videos[selectedVideo]?.videoLink;
      }
      setPlaying(false);
    }
  }, [audios, videos]);

  useEffect(() => {
    if (audios && audioRef.current) {
      audioRef.current.src = audios[selectedAudio]?.audioLink;
      audioRef.current.play();
      if (audios[selectedAudio]?.startAt) {
        audioRef.current.currentTime = audios[selectedAudio]?.startAt;
      }
      setPlaying(true);
    }
  }, [selectedAudio]);

  useEffect(() => {
    if (videos) {
      if (imageRef.current)
        imageRef.current.src = videos[selectedVideo]?.videoLink;
      if (videoRef.current) {
        videoRef.current.src = videos[selectedVideo]?.videoLink;
        videoRef.current.play();
      }
      setPlaying(true);
    }
  }, [selectedVideo]);

  useEffect(() => {
    if (imageRef.current)
      imageRef.current.src = videos[selectedVideo]?.videoLink;
  }, [videos, imageRef.current]);

  useEffect(() => {
    if (audios && videos) {
      if (playing) {
        audioRef.current.play();
        if (videoRef.current) videoRef.current.play();
      } else {
        audioRef.current.pause();
        if (videoRef.current) videoRef.current.pause();
      }
    }
  }, [
    playing,
    audios,
    videos,
    videoRef.current,
    imageRef.current,
    audioRef.current,
  ]);
  useEffect(() => {
    if (audios.length < 5) {
      setAudios((prevAudios) => {
        if (prevAudios.length >= 5) return prevAudios;
        const emptyAudioArray = [];
        for (let i = prevAudios.length; i < 5; i++) {
          emptyAudioArray.push({ emptyCard: true, id: i });
        }
        return [...prevAudios, ...emptyAudioArray];
      });
    }
  }, [audios.length]);

  useEffect(() => {
    if (videos.length < 5) {
      setVideos((prevVideos) => {
        if (prevVideos.length >= 5) return prevVideos;
        const emptyVideoArray = [];
        for (let i = prevVideos.length; i < 5; i++) {
          emptyVideoArray.push({ emptyCard: true, id: i });
        }
        return [...prevVideos, ...emptyVideoArray];
      });
    }
  }, [videos.length]);

  useEffect(() => {
    if (audios) audioRef.current.volume = volume;
  }, [volume]);

  function togglePlayPause() {
    setPlaying((prevPlaying) => {
      const playing = !prevPlaying;
      return playing;
    });
  }

  function removeAudio(index) {
    console.log("removing audio at index " + index);
    setGlobalAudios((audiosArray) => {
      if (index >= 0 && index < audiosArray.length) {
        const updatedArray = [...audiosArray];
        updatedArray.splice(index, 1); // Remove 1 element at the given index
        return updatedArray;
      }
    });
  }

  function removeVideo(index) {
    console.log("removing" + index);
    setGlobalVideos((videosArray) => {
      if (index >= 0 && index < videosArray.length) {
        const updatedArray = [...videosArray];
        updatedArray.splice(index, 1); // Remove 1 element at the given index
        return updatedArray;
      }
    });
  }
  // Mashboard.jsx
  async function mash() {
    setLoading(true);
    const videoObj = globalVideos[selectedVideo];
    const audioObj = globalAudios[selectedAudio];
    console.log(videoObj);
    let videoURL = "";

    try {
      if (
        videoObj.type == "gif" ||
        videoObj.type == "Drawing" ||
        videoObj.type == "Painting" ||
        videoObj.type == "Photography"
      ) {
        const res = await fetch("https://api.mashlabs.xyz/mergeimg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: videoObj.videoLink,
            audioUrl: audioObj.audioLink,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          videoURL = data.url;
        } else {
          throw new Error("Error in Mashing Video");
        }
      } else {
        const res = await fetch("https://api.mashlabs.xyz/mergevideo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoUrl: videoObj.videoLink,
            audioUrl: audioObj.audioLink,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          videoURL = data.url;
        } else {
          throw new Error("Error in Mashing Video");
        }
      }
      const videoBase64 = Base64.encode(JSON.stringify(videoObj));
      const audioBase64 = Base64.encode(JSON.stringify(audioObj));

      // Now wrap them in encodeURIComponent
      const videoParam = encodeURIComponent(videoBase64);
      const audioParam = encodeURIComponent(audioBase64);
      const videoURLParam = encodeURIComponent(videoURL);

      navigate(
        `/premint?video=${videoParam}&audio=${audioParam}&mashedVideo=${videoURLParam}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mashboardPage">
      <LoaderDialog
        message={"Please wait, your request is Processing"}
        open={loading}
      />
      {
        <div className="pageContent">
          <div className="top">
            <Link to="/">
              <FaAngleLeft size={12} /> Back to collections
            </Link>
          </div>
          <div className="mashboardMain">
            <div className="preview">
              <div className="text">PREVIEW</div>
              <MashedPreview
                type={videos[selectedVideo]?.type}
                imageRef={imageRef}
                togglePlayPause={togglePlayPause}
                videoRef={videoRef}
                audioRef={audioRef}
                playing={playing}
                volume={volume}
                videoOnly={true}
                setVolume={setVolume}
              />
              <div className="mashButton">
                <Button
                  className={`button fullbutton ${
                    (globalVideos.length <= 0 || globalAudios.length <= 0) &&
                    "disabled"
                  }`}
                  disabled={
                    loading ||
                    globalVideos.length <= 0 ||
                    globalAudios.length <= 0
                  }
                  onClick={() => {
                    mash();
                  }}
                >
                  MASH
                </Button>
              </div>

              {collection && (
                <div className="info">
                  <div className="heading">Collection Details</div>
                  <div className="textContainer">
                    <div className="title">Aerial Collection</div>
                    <div
                      className="subtext copyable"
                      onClick={() => {
                        navigator.clipboard.writeText("jlajsldfjlajsdlfj");
                      }}
                    >
                      csl.. kcl
                    </div>
                  </div>
                  <div className="textContainer">
                    <div className="title">Royalties</div>
                    <div className="subtext">{1.2}%</div>
                  </div>
                  <div className="textContainer">
                    <div className="title">Mints Available</div>
                    <div className="subtext">
                      {4}/{32}
                    </div>
                  </div>
                  {/* <div className="textContainer">
                  <div className="title">Mints Supplied</div>
                  <div className="subtext">{collection.suppliedMints} </div>
                </div> */}
                </div>
              )}
            </div>

            <div className="content">
              <ScrollableContainer>
                {videos?.map((video, index) => {
                  return video.emptyCard ? (
                    <EmptyCard type="video" key={video.id} />
                  ) : (
                    <VisualCard
                      key={index}
                      video={video}
                      remove={()=>removeVideo(index)}
                      isSelected={selectedVideo == index}
                      setSelected={() => setSelectedVideo(index)}
                    />
                  );
                })}
              </ScrollableContainer>
              <Separator />
              <ScrollableContainer>
                {audios?.map((audio, index) => {
                  return audio.emptyCard ? (
                    <EmptyCard type="audio" key={audio.id} />
                  ) : (
                    <AudioCard
                      key={index}
                      audio={audio}
                      remove={()=>removeAudio(index)}
                      isSelected={selectedAudio == index}
                      setSelected={() => setSelectedAudio(index)}
                    />
                  );
                })}
              </ScrollableContainer>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export function MashedPreview({
  type,
  imageRef,
  togglePlayPause,
  videoRef,
  audioRef,
  playing,
  volume,
  setVolume,
  videoOnly,
}) {
  return (
    <div className="mashedPreview">
      <div className="controls">
        <div
          className={`clickable ${!playing ? "darken" : ""}`}
          onClick={() => togglePlayPause()}
        >
          <div className="playpause">{playing ? "" : <FaPlay />}</div>
        </div>
      </div>
      <div className="video">
        {type && type == "gif" ? (
          <img ref={imageRef} className="mashImage"></img>
        ) : videoOnly ? (
          <video
            ref={videoRef}
            className="mashVideo"
            loop
            autoPlay
            playsInline
          ></video>
        ) : (
          <video
            ref={videoRef}
            className="mashVideo"
            muted
            loop
            autoPlay
            playsInline
          ></video>
        )}
      </div>
      <audio ref={audioRef} className="mashAudio" autoPlay loop hidden></audio>
    </div>
  );
}