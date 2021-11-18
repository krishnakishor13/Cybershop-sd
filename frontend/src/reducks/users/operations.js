import API from "../../API";
import { signInAction, signUpAction, signOutAction } from "./actions";
import { push } from "connected-react-router";

const api = new API();
const LOGIN_USER_KEY = "LOGIN_USER_KEY";

export const fetchUserFromLocalStorage = () => {
  return async (dispatch) => {
    const userJSON = localStorage.getItem(LOGIN_USER_KEY);
    if (userJSON && userJSON.token !== "") {
      dispatch(signInAction(JSON.parse(userJSON)));
    }
  };
};

export const signUp = (user_name, email, password) => {
  return async (dispatch) => {
    // Validation
    if (user_name === "" || email === "" || password === "") {
      alert("Please fill out name, email, and password.");
      return false;
    }

    return api
      .signUp(user_name, email, password)
      .then((user) => {
        dispatch(signUpAction(user));
        localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
        dispatch(push("/"));
      })
      .catch((error) => {
        alert("Failed to connect API to add a post");
        console.log(error);
      });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    // Validation
    if (email === "" || password === "") {
      alert("Please fill out email and password.");
      return false;
    }

    return api
      .signIn(email, password)
      .then((user) => {
        dispatch(signInAction(user));
        localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
        dispatch(push("/"));
      })
      .catch((error) => {
        alert("Failed to connect API to add a post");
        console.log(error);
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch(signOutAction());
    localStorage.removeItem(LOGIN_USER_KEY);
    dispatch(push("/signin"));
  };
};
