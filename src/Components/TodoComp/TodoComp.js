import React, { useState, useEffect } from "react";
import "./TodoComp.css";
import TodoList from "../TodoList/TodoList";
import { getToken } from "../../setLocalstroage";
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const TodoComp = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showLog, setShowLog] = useState(false);

  const changeHandler = (e) => {
    setTask(e.target.value);
  };

  useEffect(() => {
    const token = getToken("token");
    console.log(token);
    fetch(`${URL}/api/v1/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status === 403) return navigate("/");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data", data.todos);
        setTodos(data.todos);
      });
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(todos);
    const token = getToken("token");
    console.log(token);
    fetch(`${URL}/api/v1/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title: task }),
    })
      .then((response) => {
        if (response.status === 403) return navigate("/");
        return response.json();
      })
      .then((data) => {
        console.log("posted data", data);
      });
    if (task === "") {
      setErrorMsg("Can't enter the empty Todo");
      setTimeout(() => {
        setErrorMsg("");
      }, 900);
    }
    if (task) {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  const deleteHandler = (indexValue) => {
    const newTodos = todos.filter((todo, index) => index !== indexValue);
    setTodos(newTodos);
  };

  return (
    <div className="card">
      <div className="card-title">
        <h1>Online ToDo Application</h1>
      </div>

      <div className="circle"></div>
      <div className="todo_header" onClick={() => setShowLog(!showLog)}>
        {getToken("Useremail").split("@")[0].slice(0, 7)}
        <div className="triangle"></div>
      </div>
      {showLog && (
        <div
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          LOGOUT
        </div>
      )}
      <form onSubmit={SubmitHandler} className="card-body">
        <input
          type="text"
          value={task}
          onChange={changeHandler}
          placeholder="Enter your todo here ..."
        />
        <button onClick={SubmitHandler}>Add Todo</button>
        <p className="error-msg">{errorMsg}</p>
      </form>
      <TodoList todos={todos} deleteHandler={deleteHandler} />
    </div>
  );
};

export default TodoComp;
