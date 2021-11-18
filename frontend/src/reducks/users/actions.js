export const SIGN_UP = "SIGN_UP";
export const signUpAction = (user) => {
  return {
    type: "SIGN_UP",
    payload: user,
  };
};
export const SIGN_IN = "SIGN_IN";
export const signInAction = (user) => {
  return {
    type: "SIGN_IN",
    payload: user,
  };
};
export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {},
  };
};
