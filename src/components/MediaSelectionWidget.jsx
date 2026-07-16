import React, { useContext, useEffect, useState } from "react";
import "./MediaSectionWidget.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { RiVideoLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LuMusic } from "react-icons/lu";
import { MediaContext } from "../context/MediaContext";
import { RxCross2 } from "react-icons/rx";
export default function MediaSelectorWidget() {
  const {
    globalAudios,
    setGlobalAudios,
    globalVideos,
    setGlobalVideos,
    mediaView,
    setMediaView,
  } = useContext(MediaContext);

  const navigate = useNavigate();

  const [renderableVisualCards, setRenderableVisualCards] = useState([]);
  const [renderableAudioCards, setRenderableAudioCards] = useState([]);
  
  useEffect(() => {
    if (globalVideos.length < 5) {
      setRenderableVisualCards(() => {
        if (globalVideos.length >= 5) return globalVideos;
        const emptyVideoArray = [];
        for (let i = globalVideos.length; i < 5; i++) {
          emptyVideoArray.push({ emptyCard: true, id: "e" + i });
        }
        return [...globalVideos, ...emptyVideoArray];
      });
    } else {
      setRenderableVisualCards(globalVideos);
    }
  }, [globalVideos]);

  useEffect(() => {
    if (globalAudios.length < 5) {
      setRenderableAudioCards(() => {
        if (globalAudios.length >= 5) return globalAudios;
        const emptyAudioArray = [];
        for (let i = globalAudios.length; i < 5; i++) {
          emptyAudioArray.push({ emptyCard: true, id: "e" + i });
        }
        return [...globalAudios, ...emptyAudioArray];
      });
    } else {
      setRenderableAudioCards(globalAudios);
    }
  }, [globalAudios]);

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

  return (
    visible(globalAudios, globalVideos) && (
      <div className="mediawidgetcontainer">
        <div className="mediawidget">
          <div className="top">
            <div className="text">Select audio & visuals</div>
            <div className="mediaicons">
              <div
                className={`mediawidgetcard ${
                  mediaView === "videos" ? "active" : ""
                }`}
                onClick={() => setMediaView("videos")}
              >
                <div className="videos iconIcon">
                  <RiVideoLine />
                </div>
                <div className="cardtext">Visual Art</div>
              </div>
              <div
                className={`mediawidgetcard ${
                  mediaView === "audios" ? "active" : ""
                }`}
                onClick={() => setMediaView("audios")}
              >
                <div className="music iconIcon">
                  <LuMusic />
                </div>
                <div className="cardtext">Audio Tracks</div>
              </div>
            </div>
          </div>
          <div className="cards">
            {mediaView == "audios" ? (
              renderableAudioCards.map((audio, index) => {
                return audio.emptyCard ? (
                  <EmptyMediaSelectorCard key={index} />
                ) : (
                  <MediaWidgetCard
                    key={index}
                    image={audio.art}
                    remove={() => removeAudio(index)}
                  />
                );
              })
            ) : mediaView == "videos" ? (
              renderableVisualCards.map((video, index) => {
                return video.emptyCard ? (
                  <EmptyMediaSelectorCard key={index} />
                ) : (
                  <MediaWidgetCard
                    key={index}
                    image={video.thumbnail}
                    remove={() => removeVideo(index)}
                  />
                );
              })
            ) : (
              <EmptyMediaSelectorCard />
            )}
          </div>
          <div className="button" onClick={() => navigate("/mashboard")}>
            GO TO MASHBOARD
          </div>
        </div>
      </div>
    )
  );
}

function visible(globalAudios, globalVideos) {
  let visible = false;
  if (location.pathname == "/audios" || location.pathname == "/videos") {
    visible = true;
  }
  if (location.pathname == "/" || location.pathname.includes("/profile")) {
    if (globalVideos.length > 0 || globalAudios.length > 0) {
      visible = true;
    }
  }
  return visible;
}

function EmptyMediaSelectorCard() {
  return (
    <div className="mediawidgetcard">
      <AiOutlinePlus />
    </div>
  );
}
function MediaWidgetCard({ image, remove }) {
  return (
    <div className="mediawidgetcard">
      <div className="remove" onClick={remove}>
        <RxCross2 />
      </div>
      <img src={image} alt="" />
    </div>
  );
}
