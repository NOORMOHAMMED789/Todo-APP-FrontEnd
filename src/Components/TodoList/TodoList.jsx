import React from "react";
import { useEffect } from "react";
import "./TodoList.css";

const TodoList = ({ todos, deleteHandler }) => {
  useEffect(() => {}, []);
  return (
    <div>
      {todos.map((todo, index) => {
        return (
          <h3 key={index} className="todolist-body">
            {todo} &nbsp;{" "}
            <button onClick={() => deleteHandler(index)}>Delete</button>
          </h3>
        );
      })}
    </div>
  );
};

export default TodoList;
