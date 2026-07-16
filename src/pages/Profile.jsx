import { useContext, useEffect, useRef, useState } from "react";
import ScrollableContainer from "../components/ScrollableContainer";
import "./Profile.scss";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaPlus, FaRegStar } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { LuLoader} from "react-icons/lu";
import { Footer } from "./Landing";
import { AiOutlinePlus } from "react-icons/ai";
import { FullArt } from "../components/FullArt";
import { MediaContext } from "../context/MediaContext";

export default function Profile() {
  const sections = [
    {
      name: "New Releases",
      id: "newreleases",
    },
    {
      name: "Collections",
      id: "collections",
    },
    {
      name: "Solo Work",
      id: "solowork",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("newreleases");
  const [artistDetails, setArtistDetails] = useState();
  const [newReleases, setNewReleases] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(null);
  const {
    globalAudios,
    setGlobalAudios,
    globalVideos,
    setGlobalVideos,
    setMediaView,
  } = useContext(MediaContext);

  const { id } = useParams();

  function addAudio(audio) {
    setGlobalAudios((oldAudios) => {
      setMediaView("audios");
      const isAlreadyAdded = oldAudios.some(
        (existingAudio) => existingAudio.id === audio.id
      );
      if (true || !isAlreadyAdded) {
        // disabling this for now
        return [...oldAudios, audio];
      }
      return oldAudios;
    });
  }
  function addVideo(video) {
    console.log("adding video");
    setGlobalVideos((oldvideos) => {
      setMediaView("videos");
      const isAlreadyAdded = oldvideos.some(
        (existingVideo) => existingVideo.id === video.id
      );
      if (true || !isAlreadyAdded) {
        // disabling this check for now
        return [...oldvideos, video];
      }
      return oldvideos;
    });
  }
  function addRealMedia(media) {
    if (media.type == "Song") {
      const addableMedia = {
        ...media,
        art: media.image_url,
        audioLink: media.song_url,
      };
      console.log(addableMedia);
      addAudio(addableMedia);
    }
    console.log(media);
    if (
      media.type == "Drawing" ||
      media.type == "Painting" ||
      media.type == "Photography"
    ) {
      const addableMedia = {
        ...media,
        thumbnail: media.image_url,
        videoLink: media.image_url,
        type: "gif",
      };
      addVideo(addableMedia);
    }
  }

  useEffect(() => {
    fetch("https://api.mashlabs.xyz/artists/" + id)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setArtistDetails(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch("https://api.mashlabs.xyz/artists/" + id + "/solo-works")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setNewReleases(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch("https://api.mashlabs.xyz/artists/" + id + "/solo-works")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setFeatured(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return artistDetails ? (
    <>
      <div className="profile">
        <div className="overview">
          <div className="banner">
            <img
              src={
                artistDetails.bannerpicture ||
                "https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg?cs=srgb&dl=pexels-wolfgang-1002140-2747446.jpg&fm=jpg"
              }
              alt=""
            />
          </div>
          <div className="profileDetails">
            <div className="detailsMain">
              <img
                src={artistDetails.profilepicture}
                alt=""
                className="profileImg"
              />
              <div className="identifier">@{artistDetails.name}</div>
              <div className="socials">
                <div className="social">
                  Instagram{" "}
                  <MdOutlineArrowOutward size={13} className="arrow" />
                </div>
                <div className="social">
                  Tiktok <MdOutlineArrowOutward size={13} className="arrow" />
                </div>
                <div className="social">
                  Twitter <MdOutlineArrowOutward size={13} className="arrow" />
                </div>
                <div className="social">
                  Website <MdOutlineArrowOutward size={13} className="arrow" />
                </div>
              </div>
              <div className="profileButtons">
                <button className="button contact">Contact</button>
                <button className="button">Follow</button>
              </div>
            </div>
            <div className="profileDescription">
              <div className="name">{artistDetails?.name}</div>
              <div className="descContent">{artistDetails.description}</div>
            </div>
          </div>
        </div>
        <div className="searchcontainer">
          <div className="icon">
            <CiSearch />
          </div>
          <input
            type="text"
            name="search"
            id=""
            placeholder="Search Songs, Albums, Tags..."
            className="searchBox"
          />
        </div>
        <div className="section">
          <div className="sectionSubtitle">Artist</div>
          <div className="sectionTitle">Featured Content</div>
          <div className="separator"></div>
          <ScrollableContainer>
            {featured.length > 6 &&
              [
                featured[0],
                featured[1],
                featured[2],
                featured[3],
                featured[5],
              ]?.map((media, index) => {
                return (
                  <CollectionCard
                    key={index}
                    img={media.image_url}
                    title={media.file_name}
                    subtitle={media.creator}
                    scarcity={media.scarcity}
                    thumbnail={getThumbnail(media, id)}
                    addMedia={() => addRealMedia(media)}
                  />
                );
              })}
          </ScrollableContainer>
        </div>
        <div className="section mediaSection">
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
          {selectedOption == "newreleases" ? (
            <ScrollableContainer>
              {newReleases?.slice(0, 8).map((audio, index) => {
                return (
                  <MediaCard
                    key={index}
                    title={audio.file_name}
                    subtitle={audio.scarcity}
                    img={audio.image_url}
                    audio={audio.song_url}
                    playing={playing}
                    setPlaying={setPlaying}
                    selected={selected}
                    thumbnail={getThumbnail(audio, id)}
                    setSelected={setSelected}
                    index={index}
                    fullVisibility={true}
                    addMedia={() => addRealMedia(audio)}
                  />
                );
              })}
            </ScrollableContainer>
          ) : selectedOption == "collections" ? (
            <div className="collectionsPlaceholder">No Collections...</div>
          ) : selectedOption == "solowork" ? (
            <ScrollableContainer>
              {newReleases?.map((audio, index) => {
                return (
                  <MediaCard
                    key={index}
                    title={audio.file_name}
                    subtitle={audio.scarcity}
                    img={audio.image_url}
                    audio={audio.song_url}
                    playing={playing}
                    thumbnail={getThumbnail(audio, id)}
                    setPlaying={setPlaying}
                    selected={selected}
                    setSelected={setSelected}
                    index={index}
                    fullVisibility={true}
                    addMedia={() => addRealMedia(audio)}
                  />
                );
              })}
            </ScrollableContainer>
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div className="loading">
      <LuLoader className="loaderFull spin" />
    </div>
  );
}

export function CollectionCard({
  img,
  title,
  subtitle,
  scarcity,
  addMedia,
  thumbnail,
}) {
  const [fullArtVisible, setFullArtVisible] = useState(false);
  return (
    <div className="collectionCard">
      <FullArt
        src={img}
        type={"image"}
        visible={fullArtVisible}
        setVisible={setFullArtVisible}
      />
      {/* <div className="starcontainer">
        <FaStar /> */}
      {/* <FaRegStar /> */}
      {/* </div> */}
      <img
        src={thumbnail ? thumbnail : img}
        alt=""
        className="cardImg"
        onClick={() => setFullArtVisible(true)}
      />
      {addMedia && (
        <div className="addIcon" onClick={() => addMedia()}>
          <FaPlus />
        </div>
      )}
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
      <div className="scarcity">{scarcity}</div>
    </div>
  );
}

export function getThumbnail(media, id) {
  if(media.artist_id == '1'){
    console.log(media)
    if (media.id == 16) {
      return "/cropped/thisminority.jpg";
    }
  }
  if (media.artist_id != '2') return null;
  if (media.id == 2) {
    return "/cropped/goldenBuddha.jpeg";
  }
  if (media.id == 11) {
    return "/cropped/dapperDontMatter.jpeg";
  }
  if (media.id == 15) {
    return "/cropped/samuraiSkull.jpeg";
  }
  return null;
}
// function MediaCard({ img, title, subtitle }) {
//   return (
//     <div className="mediaCard">
//       <img src={img} alt="" className="cardImg" />
//       <div className="title">{title}</div>
//       <div className="subtitle">{subtitle}</div>
//     </div>
//   );
// }

export function MediaCard({
  title,
  subtitle,
  img,
  video,
  audio,
  index,
  playing,
  setPlaying,
  selected,
  setSelected,
  addMedia,
  fullVisibility,
  thumbnail,
}) {
  const audioRef = useRef(null);
  const [fullArtVisible, setFullArtVisible] = useState(false);

  const handleImageClick = () => {
    console.log(fullVisibility);
    if (fullVisibility && !audio) {
      setFullArtVisible(true);
      return;
    }
    if (addMedia) {
      addMedia();
      return;
    }
    try {
      if (playing && index == selected) {
        setPlaying(false);
      } else {
        setPlaying(true);
        setSelected(index);
      }
    } catch (error) {}
  };
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }
    if (playing && selected == index) {
      audioElement.currentTime = 0;
      audioElement.play();
    } else if ((playing && selected != index) || !playing) {
      if (!audioElement.paused) {
        audioElement.pause();
      }
    }
  }, [playing, selected]);

  return (
    <div className="mediaCard">
      <FullArt
        src={video ? video : img}
        type={video ? "video" : "image"}
        visible={fullArtVisible}
        setVisible={setFullArtVisible}
      />
      <div className="artistImage">
        {video ? (
          <video
            src={video}
            className="artistAvatar"
            autoPlay
            muted
            loop
            onClick={handleImageClick}
          ></video>
        ) : (
          <img
            src={thumbnail ? thumbnail : img}
            alt=""
            className="artistAvatar"
            onClick={handleImageClick}
          />
        )}
        {!video && audio && (
          <div className="speakerIcon">
            {playing && selected == index ? (
              <HiSpeakerWave size={14} />
            ) : (
              <HiSpeakerXMark size={14} />
            )}
          </div>
        )}
        {addMedia && (
          <div className="addIcon" onClick={() => addMedia()}>
            <FaPlus />
          </div>
        )}
      </div>
      <div className="">
        <div className="title">{title}</div>
        <div className="subtitle">{subtitle}</div>
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
