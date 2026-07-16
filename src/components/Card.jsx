import "./Card.scss";
import { LuClock4 } from "react-icons/lu";
import { FaPlay } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

export function VisualCard({ video, isSelected, setSelected, remove }) {
  return (
    <div
      className={`card visualCard ${isSelected ? "selected" : ""}`}
      onClick={() => {
        setSelected();
      }}
    >
      <div className="remove" onClick={remove}>
        <RxCross2 />
      </div>
      <img src={video.thumbnail} alt="" />
      <div className="videoInfoContainer">
        <Info info={video} />
      </div>
    </div>
  );
}
export function EmptyCard({ type }) {
  const navigate = useNavigate();
  return (
    <div
      className={`card`}
      onClick={() => {
        type === "audio"
          ? navigate("/audios")
          : type === "video"
          ? navigate("/videos")
          : console.log("where did you click dude!");
      }}
    >
      <div
        className={`container ${
          type === "audio" ? "emptyAudio" : type === "video" ? "emptyVideo" : ""
        }`}
      >
        <AiOutlinePlus />
      </div>
    </div>
  );
}

export function AudioCard({ audio, isSelected, setSelected, remove }) {
  return (
    <div
      className={`card audioCard ${isSelected ? "selected" : ""}`}
      onClick={() => {
        setSelected();
      }}
    >
      <div className="remove" onClick={remove}>
        <RxCross2 />
      </div>
      <div className="top">
        <FaPlay />
        <img src="/images/waveform.svg" alt="" />
      </div>
      <div className="audioSeparator"></div>
      <Info info={audio} />
    </div>
  );
}

function Info({ info }) {
  return (
    <div className="info">
      <div className="title">{info.title}</div>
      <div className="artist">{info.artist}</div>
      <div className="secondaryInfo">
        <div className="infocontainer">
          <div className="icon">
            <LuClock4 />
          </div>
          <div className="text">{formatDuration(info.duration)}</div>
        </div>
        <div className="infocontainer">
          <div className="icon">
            <svg
              width="46"
              height="35"
              viewBox="0 0 46 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.8175 26.2376H20.886C20.886 26.836 21.119 27.3376 21.5848 27.7424C22.0507 28.1472 22.6004 28.3495 23.234 28.3495C23.8676 28.3495 24.4174 28.1472 24.8832 27.7424C25.3491 27.3376 25.582 26.836 25.582 26.2376H27.7903C28.4159 26.2376 28.9404 26.034 29.3637 25.627C29.7869 25.2199 29.9985 24.7155 29.9985 24.1137V17.742C29.9985 17.1402 29.7869 16.6282 29.3637 16.2058C28.9404 15.7834 28.4159 15.5722 27.7903 15.5722H21.1656V13.777H27.6783C28.2934 13.777 28.8338 13.557 29.2997 13.117C29.7656 12.677 29.9985 12.1578 29.9985 11.5594C29.9985 10.961 29.7656 10.4419 29.2997 10.0019C28.8338 9.56187 28.2841 9.34188 27.6505 9.34188H25.582C25.582 8.74349 25.3491 8.25069 24.8832 7.8635C24.4174 7.47631 23.8676 7.28271 23.234 7.28271C22.6004 7.28271 22.0507 7.48006 21.5848 7.87475C21.119 8.2694 20.886 8.75845 20.886 9.34188H18.7616C18.1122 9.34188 17.5679 9.54932 17.1285 9.96422C16.6892 10.3791 16.4695 10.8933 16.4695 11.5066V17.8821C16.4695 18.4843 16.6892 18.989 17.1285 19.3963C17.5679 19.8036 18.1122 20.0073 18.7616 20.0073H25.3025V21.8025H18.7898C18.1747 21.8025 17.6342 22.0225 17.1684 22.4625C16.7025 22.9024 16.4695 23.4216 16.4695 24.02C16.4695 24.6184 16.7025 25.1376 17.1684 25.5776C17.6342 26.0176 18.184 26.2376 18.8175 26.2376ZM5.56808 34.6854C4.27668 34.6854 3.17116 34.2512 2.25152 33.3826C1.33189 32.5141 0.87207 31.47 0.87207 30.2503V5.32914C0.87207 4.10949 1.33189 3.06538 2.25152 2.19684C3.17116 1.32829 4.27668 0.894021 5.56808 0.894021H40.9C42.1914 0.894021 43.2969 1.32829 44.2166 2.19684C45.1362 3.06538 45.596 4.10949 45.596 5.32914V30.2503C45.596 31.47 45.1362 32.5141 44.2166 33.3826C43.2969 34.2512 42.1914 34.6854 40.9 34.6854H5.56808ZM5.56808 30.2503H40.9V5.32914H5.56808V30.2503Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text">{info.price} ETH</div>
        </div>
      </div>
    </div>
  );
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Ensure seconds are always two digits
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  // If minutes are less than 10, we can return M:SS, otherwise MM:SS
  if (minutes < 10) {
    return `${minutes}:${formattedSeconds}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${formattedSeconds}`;
  }
}
