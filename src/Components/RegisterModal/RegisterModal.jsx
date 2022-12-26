import React, { useState } from "react";

const RegisterModal = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="modal">
      <div className="modal-title">
        <h1 className="modal__title">REGISTER</h1>
      </div>
      <form className="modal-body">
        <input type="text" placeholder="Enter your name" />
        <input type="password" placeholder="Enter Your password" />
        <input type="password" placeholder="confirm your password" />
        <input type="submit" value="Submit" name="submit" />
      </form>
    </div>
  );
};

export default RegisterModal;
