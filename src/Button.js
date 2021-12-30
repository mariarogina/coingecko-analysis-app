import React from "react";

export const Button = ({ text, handlerFunc }) => {
  return (
    <button
      className="infoButton"
      onClick={() => {
        handlerFunc();
      }}
    >
      {text}
    </button>
  );
};
