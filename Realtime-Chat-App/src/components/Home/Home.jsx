import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../server/firebase.js";
import SideBar from "../SideBar/SideBar.jsx";

const Home = (props = null) => {
  const navigate = useNavigate();
  console.log(props);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
      }else{
        navigate("/login");
      }
    })
  }, [])

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {});
  };

  return (
    <>
      <div>
        <button
          onClick={logout}
          className="inline-flex w-100px items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
        >
          Logout
        </button>
      </div>
      <SideBar/>
    </>
  );
};

export default Home;
