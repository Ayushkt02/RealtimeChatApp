import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../server/firebase.js";
import SideBar from "../SideBar/SideBar.jsx";

const Home = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props) {
    } else {
      navigate("/login");
    }
  }, [props]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <SideBar name={props} />
    </>
  );
};

export default Home;
