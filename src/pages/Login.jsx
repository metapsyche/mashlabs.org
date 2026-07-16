import "./auth.scss";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";

export default function Login() {
  return (
    <div className="authContainer">
      <div className="formContainer">
        <LoginForm />
      </div>
      <div className="image">
        <img src="/images/authImage.jpg" alt="" />
      </div>
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  function signInWithGoogle() {
    setLoading("google");
    setErrorMessage("");
    signInWithPopup(auth, provider)
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

  function signInWithEmail() {
    setLoading("email");
    setErrorMessage("");
    signInWithEmailAndPassword(auth, email, password)
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
        <button className="button" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
      <div className="form">
        <h1 className="heading">Login to Mash</h1>
        <h4 className="subheading">Welcome back!</h4>
        <div className="br" />
        <div className="buttons">
          <button
            className="loginGoogle button"
            onClick={() => signInWithGoogle()}
          >
            {" "}
            <img src="/images/googleLogo.png" alt="" />
            Login with Google
            {loading === "google" && (
              <LuLoader className="dialogLoader spin" />
            )}
          </button>
          <button className="loginWallet button">Login with Wallet</button>
        </div>
        <div className="or">
          <div className="br"></div>
          OR
          <div className="br"></div>
        </div>
        <div className="emailForm">
          <input
            type="email"
            className="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            autoComplete="current-password"
            className="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="loginWallet button"
            onClick={() => signInWithEmail()}
          >
            Login with Email
            {loading === "email" && <LuLoader2 className="dialogLoader spin" />}
          </button>
          {errorMessage && (
            <div className="errorMessageRed">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
