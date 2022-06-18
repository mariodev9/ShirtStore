import React from "react";
import "../../assets/css/Button.css";

export const Button = ({ msg }) => {
  return (
    <button class="button-82-pushable" role="button">
      <span class="button-82-shadow"></span>
      <span class="button-82-edge"></span>
      <span class="button-82-front text">{msg}</span>
    </button>
  );
};
