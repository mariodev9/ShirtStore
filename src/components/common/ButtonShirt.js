import React, { useState } from "react";
import "../../assets/css/Button.css";

export const ButtonShirt = ({ msg, color, shadow, onClick }) => {
  // Utilizando lo comentado: este voton se puede volver disabled al apretar
  // const [disable, setDisable] = useState(false);

  return (
    <button
      onClick={() => {
        // disable ? setDisable(false) : setDisable(true);
        onClick();
      }}
      // disabled={disable ? disable : null}
      className="button-82-pushable"
    >
      <span className="button-82-shadow"></span>
      <span
        className="button-82-edge"
        style={{
          background: "linear-gradient( " + shadow + "," + shadow + ")",
        }}
      ></span>
      <span
        className="button-82-front text"
        style={{ background: color }}
        // style={disable ? { background: "#7F8487" } : { background: color }}
      >
        {msg}
      </span>
    </button>
  );
};
