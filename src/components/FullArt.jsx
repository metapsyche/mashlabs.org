import { RxCross2 } from "react-icons/rx";
import "./FullArt.scss";
import { AiOutlineClose } from "react-icons/ai";

export function FullArt({ type, src, visible, setVisible }) {
  return (
    visible && (
      <>
        <div className="full-art-container">
          <div className="close" onClick={() => setVisible(false)}>
            <AiOutlineClose />
          </div>
          {type == "image" ? (
            <img src={src} alt="" className="full-art" />
          ) : type == "video" ? (
            <video src={src} className="full-art" controls></video>
          ) : (
            <div className="invalid">Invalid type</div>
          )}
        </div>
        <div className="bgclickable" onClick={()=>setVisible(false)}></div>
      </>
    )
  );
}
