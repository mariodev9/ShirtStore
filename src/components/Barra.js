import React from "react";
import Contexto from "../context/Context";
import React, { useContext } from "react";
const { user } = useContext(Contexto);

export const Barra = () => {
  return (
    <div>
      <h1>NAVBAR </h1>
    </div>
  );
};
