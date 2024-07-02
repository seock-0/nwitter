import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { useState } from "react";
import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // creat newAccount
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        //log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div className={"authContainer"}>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <form onSubmit={onSubmit} className={"container"}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
          className={"authInput"}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
          className={"authInput"}
        />
        <input
          type="submit"
          value={newAccount ? "Creat Account" : "Log In"}
          className={"authInput authSubmit"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className={"authSwitch"}>
        {newAccount ? "Sign In" : "Creat Account"}
      </span>
      <div className={"authBtns"}>
        <button onClick={onSocialClick} name="google" className="authBtn">
        <FontAwesomeIcon icon = {faGoogle} /> Continue with Google
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
        <FontAwesomeIcon icon = {faGithub} /> Continue with Github 
        </button>
      </div>
    </div>
  );
};

export default Auth;
