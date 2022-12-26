import React, { useState } from "react";
import "./TodoComp.css";
import TodoList from "../TodoList/TodoList";

const TodoComp = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

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
