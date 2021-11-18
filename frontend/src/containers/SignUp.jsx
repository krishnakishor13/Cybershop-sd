import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../reducks/users/operations";
import CrossX from "../assets/img/cross.png";
import Home from "../containers/Home";
import { push } from "connected-react-router";
import Melodium from "../assets/img/Melodium.svg";

const SignUp = () => {
  const dispatch = useDispatch();

  const closeButton = () => {
    dispatch(push("/"));
  };
  const [user_name, setUserName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  const inputUserName = (event) => {
    setUserName(event.target.value);
  };
  const inputEmail = (event) => {
    setEmail(event.target.value);
  };
  const inputPassword = (event) => {
    setPassword(event.target.value);
  };
  const signUpButton = () => {
    dispatch(signUp(user_name, email, password));
    setUserName("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <Home />
      <section class="popup">
        <div class="popup-inner">
          <div class="popup-preview">
            <div class="popup-inner">
              <span onClick={closeButton}>
                <img src={CrossX} class="close" />
              </span>
              <div class="input">
                <div class="Melodum">
                  
                  <p class="bold">FRESHZEST</p>
                </div>
                <p class="bold2">SIGN UP</p>
                <input
                  type="email"
                  class="form-control"
                  onChange={inputUserName}
                  placeholder="Enter User Name"
                  value={user_name}
                  required
                />
                <input
                  type="email"
                  class="form-control"
                  onChange={inputEmail}
                  placeholder="Enter email"
                  value={email}
                  required
                />
                <br />
                <input
                  type="password"
                  class="form-control"
                  onChange={inputPassword}
                  placeholder="Password"
                  value={password}
                  required
                />
              </div>

              <button class="button" onClick={signUpButton}>
                SIGN UP
              </button>
              <p class="bottom">
                Already a Member?{" "}
                <a href="/signin">
                  <u>Sign In.</u>
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
