import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { setToken, getToken } from "../../setLocalstroage";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [passerrorMsg, setPassErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);

  const emailChangeHandler = (e) => {
    setData({ ...data, email: e.target.value });
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
    setData({ ...data, password: e.target.value });
    if (e.target.value.length <= 8) {
      setPassErrorMsg("Password length must be more than 8");
    } else {
      setPassErrorMsg("");
    }
  };

  const blurHandler = () => {
    if (errorMsg === "" && passerrorMsg === "") {
      setErrorMsg("");
      setPassErrorMsg("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (password.length <= 8) alert("Password length must be more than 8");
    else {
      fetch(`${URL}/api/v1/user/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "Failed") {
            setMessage(data.message);
          } else {
            const token = data.token;
            setToken("token", token);
            if (token === getToken("token")) {
              console.log(token);
              console.log(data.name);
              setToken("Useremail", data.email);
              navigate("/todo");
            }
          }
        })
        .catch((e) => {
          console.log(e);
          setMessage("Server down. try after sometime !!");
        });
    }
  };
  return (
    <div className="container">
      <div className="login_title">LOGIN PAGE OF TODO APP</div>

      <form className="login-body" onSubmit={submitHandler}>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input"
          required
          onChange={emailChangeHandler}
          onBlur={blurHandler}
        />
        <div className="emailerror">{errorMsg}</div>
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
        <span className="login_show" onClick={() => setShow(!show)}>
          {show ? "show" : "Hide"}
        </span>
        <div className="passerror">{passerrorMsg}</div>
        <input type="checkbox" className="checkbox" />
        <span className="remember">Remember me ?</span>

        <button className="login-btn">LOGIN</button>
        <span className="forgot1">Forgot Password ?</span>
        <div className="passerror">{message}</div>

        <div className="login-footer">
          Need an account ?
          <span
            className="singup-btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SIGNUP
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
