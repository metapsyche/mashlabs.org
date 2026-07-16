import "./auth.scss";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";

export default function Signup() {
  return (
    <div className="authContainer">
      <div className="formContainer">
        <SignupForm />
      </div>
      <div className="image">
        <img src="/images/authImage.jpg" alt="" />
      </div>
    </div>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  function signInWithEmail() {
    setLoading("email");
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading("");
        navigate("/");
      })
      .catch((error) => {
        setLoading("");
        console.error(error.message);
        setErrorMessage(error.message);
      });
  }

  return (
    <div className="authForm">
      <div className="logo">
        <img
          onClick={() => navigate("/")}
          src="/images/Mash_Highlight_Still.png"
          className="heroImage"
          alt=""
        />
        <button className="button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
      <div className="form">
        <h1 className="heading">Welcome to Mash</h1>
        <h4 className="subheading">
          Discover + Invest on Emerging Musicians & Artists From Around The
          World
        </h4>
        <div className="br" />
        <div className="emailForm signup">
          <input
            type="email"
            className="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            autoComplete="new-password"
            className="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="loginWallet button"
            onClick={() => signInWithEmail()}
          >
            Signup with Email
            {loading === "email" && <LuLoader className="dialogLoader spin" />}
          </button>
          {errorMessage && (
            <div className="errorMessageRed">{errorMessage}</div>
          )}
        </div>
        <div className="agreements">
          By continuing, you agree to the <a>Terms of Service</a> &{" "}
          <a>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
