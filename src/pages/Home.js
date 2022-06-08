import React, { useContext, useEffect, useState } from "react";
import firebaseApp from "../firebase/credentials";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Contexto from "../context/Context";
import { Barra } from "../components/Barra";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const Home = () => {
  const { user, nombre, setUsuario, setNombre } = useContext(Contexto);

  // Button function (deberia ser logica del nav)
  const CloseSession = () => {
    window.location.replace("/Login");
    signOut(auth);
  };

  return (
    <>
      <div>
        <Barra></Barra>
        <h1>HOME GENERAL</h1>
        <h2>{nombre}</h2>
        <button
          onClick={() => {
            CloseSession();
          }}
        >
          cerrar sesion
        </button>
      </div>
    </>
  );
};
