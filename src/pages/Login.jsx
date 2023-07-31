import React, { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function Login() {
  const [showAlert, setShowAlert] = useState(false);

  function login() {
    setShowAlert(true);
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Button onClick={login} text={"Click"} />

      {showAlert && (
        <Modal message={"This is my custom modal"} onClose={handleCloseAlert} />
      )}
    </>
  );
}
