import React from "react";
import "./TodoList.css";

const TodoList = ({ todolist }) => {
  return (
    <div>
      <div>
        <h1>{todolist}</h1>
      </div>
    </div>
  );
};

export default TodoList;
