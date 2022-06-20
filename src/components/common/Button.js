import React from "react";
import "../../assets/css/Button.css";

export const Button = ({ msg, color, shadow }) => {
  return (
    <button class="button-82-pushable" role="button">
      <span class="button-82-shadow"></span>
      <span
        class="button-82-edge"
        style={{
          background: "linear-gradient( " + shadow + "," + shadow + ")",
        }}
      ></span>
      <span class="button-82-front text" style={{ background: color }}>
        {msg}
      </span>
    </button>
  );
};
