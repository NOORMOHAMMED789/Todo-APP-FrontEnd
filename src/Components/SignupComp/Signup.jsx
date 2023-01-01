import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [passerrorMsg, setPassErrorMsg] = useState("");
  const [cpasserrorMsg, setcPassErrorMsg] = useState("");
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);

  const emailChangeHandler = (e) => {
    setUserData({ ...userData, email: e.target.value });
    if (
      !e.target.value.match(/[^a-zA-Z0-9]/) ||
      !e.target.value.includes("@") ||
      !e.target.value.endsWith(".com")
    ) {
      setErrorMsg("Please enter a valid email");
    } else {
      setErrorMsg("");
    }
  };

  const passChangeHandler = (e) => {
    setUserData({ ...userData, password: e.target.value });
    if (e.target.value.length <= 8) {
      setPassErrorMsg("Password length must be more than 8");
    } else {
      setPassErrorMsg("");
    }
  };

  const cpassChangeHandler = (e) => {
    setUserData({ ...userData, confirmPassword: e.target.value });
    if (e.target.value.length <= 8) {
      setcPassErrorMsg("Password length must be more than 8");
    } else {
      setcPassErrorMsg("");
    }
  };

  const blurHandler = () => {
    if (errorMsg === "" && passerrorMsg === "" && cpasserrorMsg === "") {
      setErrorMsg("");
      setPassErrorMsg("");
      setcPassErrorMsg("");
    }
  };
  const submitHandler1 = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = userData;

    fetch(`${URL}/api/v1/user/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Failed") {
          alert("User Already Exists.Please, Login !!!");
          navigate("/", { replace: true });
        } else {
          alert("Registration Successful");
          navigate("/", { replace: true });
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <div className="container1">
      <div className="login_title">REGISTER FOR TODO APP</div>

      <form className="login-body" onSubmit={submitHandler1}>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          className="input"
          onChange={emailChangeHandler}
          onBlur={blurHandler}
        />
        <div className="emailerror error">{errorMsg}</div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type={show ? "password" : "text"}
          id="password"
          className="input"
          required
          onChange={passChangeHandler}
          onBlur={blurHandler}
        />
        <span className="show" onClick={() => setShow(!show)}>
          {show ? "show" : "Hide"}
        </span>
        <div className="passerror error">{passerrorMsg}</div>

        <label htmlFor="password" className="label">
          Confirm Password
        </label>
        <input
          type={show1 ? "password" : "text"}
          id="password"
          className="input"
          required
          onChange={cpassChangeHandler}
          onBlur={blurHandler}
        />
        <span className="show1" onClick={() => setShow1(!show1)}>
          {show1 ? "show" : "Hide"}
        </span>
        <div className="passerror error">{cpasserrorMsg}</div>

        <button className="login-btn1">SINGUP</button>
        <div className="register_footer">
          Already Registered ? Please
          <span onClick={() => navigate("/")} className="register_span">
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
