import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

const style = {
  button: `bg-gray-200 px-4 py-2 hover:bg-gray-100`,
};

const SignOut = () => {
  const logOut = () => {
    signOut(auth);
  };
  return (
    <button onClick={logOut} className={style.button}>
      Log Out
    </button>
  );
};

export default SignOut;
