import React, { useContext } from "react";
import firebaseApp from "../firebase/credentials";
import { Nav } from "../components/Nav";
// user cuando traiga info
// import { getFirestore } from "firebase/firestore";

// const firestore = getFirestore(firebaseApp);

export const Home = () => {
  // Button function (deberia ser logica del nav)

  return (
    <>
      <div>
        <Nav />
        <h1>HOME GENERAL</h1>
      </div>
    </>
  );
};
