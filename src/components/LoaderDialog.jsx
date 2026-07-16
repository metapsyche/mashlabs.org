import "./LoaderDialog.scss";
import {LuLoader } from "react-icons/lu";

export default function LoaderDialog({ message, open }) {
  return (
    <div className={`loaderDialog ${open ? "visible" : ""}`}>
      <div className="container">
        <div className="message">{message}</div>
        <LuLoader className="dialogLoader spin"/>
      </div>
    </div>
  );
}
