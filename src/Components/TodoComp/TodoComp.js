import React, { useState } from "react";
import "./TodoComp.css";
import TodoList from "../TodoList/TodoList";

const TodoComp = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const changeHandler = (e) => {
    setTask(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newTodos = [...todos, task];
    setTodos(newTodos);
    setTask("");
  };

  return (
    <div className="Todo">
      <h1 className="Todo-title">Online Todo Application</h1>
      <form className="Todo-body" onSubmit={submitHandler}>
        <input
          type="text"
          value={task}
          placeholder="Enter your todo here..."
          onChange={changeHandler}
        />
        <input type="submit" value="Add Todo" name="Add" />
      </form>
      <TodoList todolist={todos} />
    </div>
  );
};

export default TodoComp;
