import React, { useContext } from "react";
import Contexto from "../context/Context";

export const Barra = () => {
  const { user } = useContext(Contexto);
  return (
    <div>
      <h1>NAVBAR </h1>
    </div>
  );
};
