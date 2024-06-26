import React from "react";
import { useState } from "react";
function Password() {
  const [strength, setStrength] = useState(0);
  const [password, setPassword] = useState("*****");
  const [accepted, setAccepted] = useState(false);
  const checkStrength = (password) => {
    var uscore = 0;
    var lscore = 0;
    var sscore = 0;
    var nscore = 0;
    var totalScore = parseInt(password.length / 3);
    for (let i = 0; i < password.length; i++) {
      if (["@", "#", "$", "%", "&"].includes(password[i])) {
        console.log("includes a special character");
        sscore += 4;
        totalScore += 4;
      } else if (password[i] == parseInt(password[i])) {
        nscore += 1.5;
        console.log("character is number");
        totalScore += 1.5;
      } else if (password[i] === password[i].toLowerCase()) {
        lscore += 1;
        totalScore += 1;
      } else if (password[i] === password[i].toUpperCase()) {
        totalScore += 2;
        uscore += 2;
      }
    }
    if (uscore > 0 && lscore > 0 && nscore > 0 && sscore > 0) setAccepted(true);
    return setStrength(parseInt(totalScore));
  };

  const changeHandler = (e) => {
    setAccepted(false);
    setPassword(e.target.value);
    checkStrength(e.target.value);
  };
  return (
    <div className="password-container">
      <input
        placeholder="Enter the password here"
        onChange={(e) => changeHandler(e)}
      />
      <div
        className={
          accepted && strength >= 17
            ? "passwordStrengthGreen"
            : "passwordStrengthRed"
        }
      ></div>
      {!accepted && (
        <p
          className="password-requirements"
          style={{ fontSize: "12px", marginTop: "20px" }}
        >
          {" "}
          You should have one character each from special, numeric, uppercase
          and lowercase{" "}
        </p>
      )}
      {strength >= 17 ? (
        <p className="password-status" style={{ color: "green" }}>
          {accepted && "Strong"}
        </p>
      ) : (
        <p className="password-status" style={{ color: "red" }}>
          {accepted && "Weak"}
        </p>
      )}
    </div>
  );
}
export default Password;
abcd