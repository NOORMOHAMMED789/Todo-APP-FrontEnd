import React, { useState } from "react";
import "./TodoComp.css";
import TodoList from "../TodoList/TodoList";
import { getToken } from "../../setLocalstroage";
import { useNavigate } from "react-router-dom";

const TodoComp = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showLog, setShowLog] = useState(false);

  const changeHandler = (e) => {
    setTask(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
      <form onSubmit={submitHandler} className="card-body">
        <input
          type="text"
          value={task}
          onChange={changeHandler}
          placeholder="Enter your todo here ..."
        />
        <button onClick={submitHandler}>Add Todo</button>
        <p className="error-msg">{errorMsg}</p>
      </form>
      <TodoList todos={todos} deleteHandler={deleteHandler} />
    </div>
  );
};

export default TodoComp;
