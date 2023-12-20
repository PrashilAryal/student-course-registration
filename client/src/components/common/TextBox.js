import React, { useEffect, useState } from "react";
import "../../app.css";

const TextBox = ({ type, placeholder, onTextChange, value }) => {
  const [textBoxValue, setTextBoxValue] = useState("");

  const handleTextBoxChange = async (e) => {
    setTextBoxValue(e.target.value);
    if (onTextChange) {
      onTextChange(e.target.value);
    }
  };

  useEffect(() => {
    setTextBoxValue(value);
  }, [value]);

  return (
    <div className="textBox">
      <input
        className="textBox__input"
        type={type}
        value={textBoxValue}
        placeholder={placeholder}
        onChange={handleTextBoxChange}
      ></input>
    </div>
  );
};

export default TextBox;
