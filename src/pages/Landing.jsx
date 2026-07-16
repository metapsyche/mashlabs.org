import { Button, Input } from "@mui/base";
import "./Landing.scss";
import { FaEnvelope, FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useContext, useEffect, useRef, useState } from "react";
import GetSet from "../components/GetSet";
import CompactCollection from "../components/CompactCollection";
import Separator from "../components/Separator";
import ScrollableContainer from "../components/ScrollableContainer";
import { CollectionCard, getThumbnail, MediaCard } from "./Profile";
import { artists, collection1, collection2 } from "../server/data";
import fimg from "/images/footer-mash.png";
import ScrollableContainer2 from "../components/ScrollableContainer2";
import { FullArt } from "../components/FullArt";
import { MediaContext } from "../context/MediaContext";
import { Link } from "react-router-dom";
import { LuMusic } from "react-icons/lu";
import { RiVideoLine } from "react-icons/ri";

export default function Landing() {
  const [largeCollectionData, setLargeCollection] = useState({
    name: "Sintela",
    musician: "Open Skies",
    musicianAvatar: "/images/musician1.png",
    musicianCountry: "Australia",
    musicianCountryAbbriviation: "AUS",
    musicianCity: "Perth",
    musicianDescription:
      "Open Skies is the project of two brothers who are crafting unique and stirring compositions with both classical and acoustic elements to inspire your imagination.",
    musicanTags: ["feel good", "acoustic", "folk", "travel"],
    visualArtist: "Bjorn Rademaker",
    visualArtistAvatar: "/images/artist1.png",
    visualArtistCountry: "Netherlands",
    visualArtistCountryAbbriviation: "NLD",
    visualArtistCity: "Amsterdam",
    visualArtistDescription:
      "Bjorn Rademaker is a Dutch artist best known for his early illustrated series. After further work in traditional painting, Rademaker started using digital tools and moved to use free and open-source software where he's continued create collaborative beautiful stories.",
    visualArtistTags: ["animation", "fantasy", "CGI"],
    description:
      "This is the story of a woman who embarks on a quest to find her lost dragon companion. Through flashbacks, their bond is revealed, but the young dragon is later captured by an adult dragon. As our heroin is determined to rescue him, she confronts the dragon but tragically comes to find she made a fatal mistake. The film explores themes of loyalty, loss, and the consequences of obsession.",
    image: "/images/largeCoverTeaser.png",
    learnMoreLink: "https://medium.com/search?q=mashlabs.xyz",
    totalMashes: 100,
    mashesLeft: 18,
  });
  const [compactCollections, setCompactCollections] = useState([
    {
      name: "Harmony in Dreams",
      musician: "Yuri",
      musicianAvatar: "/images/musician5.png",
      musicianCountry: "Russia",
      musicianCountryAbbriviation: "RUS",
      musicianCity: "Voronezh",
      musicanTags: ["ambient", "electronic", "spacey"],
      visualArtist: "Ivanna",
      visualArtistAvatar: "/images/artist5.png",
      visualArtistCountry: "Ukrain",
      visualArtistCountryAbbriviation: "UKR",
      visualArtistCity: "Poltava",
      visualArtistTags: ["abstract"],
      videoUrl: "/videos/harmonyindreams.mp4",
      audioLink: "/audio/harmonyindreams.mp3",
      totalMashes: 650,
      mashesLeft: 88,
    },
    {
      name: "Those Were The Days",
      musician: "Fre$hah",
      musicianAvatar: "/images/musician2.jpg",
      musicianCountry: "Senegai",
      musicianCountryAbbriviation: "SEN",
      musicianCity: "Dakar",
      musicanTags: ["jazzbeats", "in the zone", "romantic"],
      visualArtist: "Charlie Frey",
      visualArtistAvatar:
        "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?q=80&w=1581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      visualArtistCountry: "United States of America",
      visualArtistCountryAbbriviation: "USA",
      visualArtistCity: "Trenton",
      visualArtistTags: ["black&white", "city", "vintage", "film"],
      videoUrl: "/collection1/vacationcity.mp4",
      audioLink: "/collection1/tightroots.mp3",
      totalMashes: 70,
      mashesLeft: 11,
      collectionId: 1,
    },
    {
      name: "Player Orc",
      musician: "Amarthi",
      musicianAvatar: "/images/musician3.png",
      musicianCountry: "Italy",
      musicianCountryAbbriviation: "ITA",
      musicianCity: "Naples",
      musicanTags: ["metal", "doom", "gym"],
      visualArtist: "Tej",
      visualArtistAvatar: "/collection2/barehands.gif",
      visualArtistCountry: "India",
      visualArtistCountryAbbriviation: "IND",
      visualArtistCity: "Hyderabad",
      visualArtistTags: ["orc", "fantasy", "gaming"],
      // videoUrl: "/videos/fantastical.mp4",
      audioLink: "/audio/audio3.mp3",
      totalMashes: 444,
      mashesLeft: 31,
      collectionId: 2,
    },
    {
      name: "Keep Going",
      musician: "Familia Pacifica",
      musicianAvatar: "/images/musician4.png",
      musicianCountry: "United States of America",
      musicianCountryAbbriviation: "USA",
      musicianCity: "Los Angeles",
      musicanTags: ["lofi", "chill", "pensive"],
      visualArtist: "Minjun",
      visualArtistAvatar: "/images/artist44.png",
      visualArtistCountry: "Korea",
      visualArtistCountryAbbriviation: "KOR",
      visualArtistCity: "Daejeon",
      visualArtistTags: ["anime"],
      videoUrl: "/videos/keepgoing.mp4",
      audioLink: "/audio/keepgoing.mp3",
      totalMashes: 1000,
      mashesLeft: 520,
    },
    {
      name: "It's (Still) a Beautiful World",
      musician: "Mei Li",
      musicianAvatar: "/images/musician6.png",
      musicianCountry: "China",
      musicianCountryAbbriviation: "CHN",
      musicianCity: "Yushi",
      musicanTags: ["peaceful", "piano", "melancholy"],
      visualArtist: "Alisher Naviev",
      visualArtistAvatar:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      visualArtistCountry: "Tijkistan",
      visualArtistCountryAbbriviation: "TJK",
      visualArtistCity: "Dushanbe",
      visualArtistTags: ["nature"],
      audioLink: "/audio/carryingyou.mp3",
      totalMashes: 250,
      mashesLeft: 44,
    },
  ]);
  const {
    globalAudios,
    setGlobalAudios,
    globalVideos,
    setGlobalVideos,
    setMediaView,
  } = useContext(MediaContext);
  const videoRef = useRef(null);
  const [realArtists, setRealArtists] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(null);
  const sections = [
    {
      name: "Works",
      id: "works",
    },
    {
      name: "Collections",
      id: "collections",
    },
    {
      name: "Artists",
      id: "artists",
    },
  ];
  const [selectedWorksOption, setSelectedWorksOption] = useState("sound");
  const [selectedOption, setSelectedOption] = useState("works");
  const collection = collection1;
  const [realArtistSongs, setRealArtistSongs] = useState([]);
  const [realArtist2media, setRealArtist2media] = useState([]);

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
    fetch("https://api.mashlabs.xyz/artists/2/solo-works")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setRealArtistSongs(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch("https://api.mashlabs.xyz/artists/1/solo-works")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setRealArtist2media(data);
      })
      .catch((error) => {
        console.error(error);
      });
    if (videoRef.current) {
      // Programmatically play the video
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, []);

  // Create a ref for the featured collection section
  const featuredCollectionRef = useRef(null);

  // Scroll handler for the Learn More button
  const scrollToFeaturedCollection = () => {
    if (featuredCollectionRef.current) {
      featuredCollectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing">
      <div className="hero">
        <div className="text">
          <div className="top">Discover + Invest</div>
          <div>In Emerging Musicians & Artists </div>
          <div>From Around The World</div>
          <div className="sub subpadding">
            Choosing and mashing music and visual elements
          </div>
          <div className="sub">
            to create unique multimedia digital collectibles
          </div>
          <button
            className="button makemash"
            onClick={() => scrollToFeaturedCollection()}
          >
            LEARN MORE
          </button>
        </div>
        <video
          src="/mash-header-2.mp4"
          alt=""
          ref={videoRef}
          loop
          muted
          playsInline
        />
      </div>
      <div className="landingContent">
        <div className="content">
          <div className="section" ref={featuredCollectionRef}>
            {/* {largeCollectionData && (
              <LargeCollection data={largeCollectionData} />
            )} */}

            <GetSet></GetSet>
          </div>
          <div className="section">
            <div className="sectionTitle">Featured Content</div>
            <div className="br"></div>
            <ScrollableContainer2>
              {realArtistSongs.length > 2 &&
                realArtist2media.length > 2 &&
                [
                  realArtistSongs[0],
                  realArtist2media[0],
                  realArtistSongs[1],
                  realArtist2media[1],
                  realArtistSongs[2],
                  realArtist2media[2],
                ]?.map((media, index) => {
                  return (
                    <CollectionCard
                      key={index}
                      img={media?.image_url}
                      thumbnail={getThumbnail(media, 2)}
                      title={media.file_name}
                      subtitle={media.title}
                      scarcity={media.scarcity}
                      addMedia={() => addRealMedia(media)}
                    />
                  );
                })}
            </ScrollableContainer2>
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
            <div className="br"></div>
            {selectedOption == "collections" ? (
              <Collections collections={compactCollections} />
            ) : selectedOption == "works" ? (
              <>
                <div className="work-types">
                  <div
                    className={`option ${
                      selectedWorksOption == "sound" ? "selected-option" : ""
                    }`}
                    onClick={() => setSelectedWorksOption("sound")}
                  >
                    <LuMusic />
                    Audio
                  </div>
                  <div
                    className={`option ${
                      selectedWorksOption == "visuals" ? "selected-option" : ""
                    }`}
                    onClick={() => setSelectedWorksOption("visuals")}
                  >
                    <RiVideoLine />
                    Visuals
                  </div>
                </div>
                <ScrollableContainer2>
                  {selectedWorksOption=='sound'?(collection?.audios
                    ?.concat(collection2?.audios)
                    .map((audio, index) => {
                      return (
                        <MediaCard
                          key={index}
                          title={audio.title}
                          subtitle={audio.artist}
                          img={audio.art}
                          audio={audio.audioLink}
                          playing={playing}
                          setPlaying={setPlaying}
                          selected={selected}
                          setSelected={setSelected}
                          index={index}
                          fullVisibility={true}
                          addMedia={() => addAudio(audio)}
                        />
                      );
                    })):
                  collection?.videos
                    ?.concat(collection2?.videos)
                    .map((audio, index) => {
                      return (
                        <MediaCard
                          key={index}
                          title={audio.title}
                          subtitle={audio.artist}
                          img={audio.thumbnail}
                          index={index}
                          fullVisibility={true}
                          addMedia={() => addVideo(audio)}
                        />
                      );
                    })}
                </ScrollableContainer2>
              </>
            ) : selectedOption == "artists" ? (
              <ScrollableContainer2>
                {realArtists?.concat(artists).map((artist, index) => {
                  return (
                    <Link
                      key={index}
                      to={artist.id ? "profile/" + artist.id : "/"}
                      className="mediacardAnchor"
                    >
                      <MediaCard
                        title={artist.name}
                        subtitle={artist?.location?.city || "NYC"}
                        img={artist.profilepicture}
                        audio={""}
                        playing={playing}
                        setPlaying={setPlaying}
                        selected={selected}
                        setSelected={setSelected}
                        index={index}
                      />
                    </Link>
                  );
                })}
              </ScrollableContainer2>
            ) : (
              <div className="empty"></div>
            )}
          </div>

          <div className="footer">
            <div className="footer-img">
              <img src={fimg} alt="" />
            </div>
            <div className="container">
              <div className="heading">Join The Community</div>
              <div className="bottom">
                <div className="formContainer">
                  {/* <div className="text">Stay in the loop...</div> */}
                  <div className="form">
                    <Input className="emailInput" placeholder="Email" />
                    <Button className="button button-foot">Submit</Button>
                  </div>
                </div>
                <div className="socials">
                  <a
                    className="twitterIcon"
                    href="https://twitter.com/mashlabs_xyz"
                    target="_blank"
                  >
                    <FaXTwitter />
                  </a>
                  <a
                    className="instagramIcon"
                    href=" https://www.instagram.com/mashlabs_xyz/"
                    target="_blank"
                  >
                    <FaInstagram />
                  </a>
                  {/* <a
                    className="discordIcon"
                    href="https://discord.gg/zvrDXQWRvQ"
                    target="_blank"
                  >
                    <FaDiscord />
                  </a> */}
                  <a
                    className="emailIcon"
                    href="mailto:info@mashlabs.xyz"
                    target="_blank"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="copyright-other">
      <div className="copyright">© Mash Labs 2025</div>

      <div className="links">
        <a href="">privacy</a>
        <a href="">terms</a>
      </div>
    </div>
  );
}

function Collections({ collections }) {
  const [selectedCollection, setSelectedCollection] = useState(0);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="collections">
      {collections && (
        <div className="container">
          <div className="options">
            {collections.map((collection, index) => {
              return (
                <div
                  key={index}
                  className={
                    "option " +
                    (index == selectedCollection ? "selectedOpt" : "")
                  }
                  onClick={() => {
                    setSelectedCollection(index), setPlaying(false);
                  }}
                >
                  {collection.name}
                </div>
              );
            })}
          </div>
          <div className="view">
            <CompactCollection
              data={collections[selectedCollection]}
              playing={playing}
              setPlaying={setPlaying}
            />
          </div>
        </div>
      )}
    </div>
  );
}
