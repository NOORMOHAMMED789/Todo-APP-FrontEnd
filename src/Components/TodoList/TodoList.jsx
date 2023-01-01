import React from "react";
import "./TodoList.css";

const TodoList = ({ todos, deleteHandler }) => {
  return (
    <div className="todos">
      {todos.map((todo, index) => {
        return (
          <h3 key={index} className="todolist-body">
            {todo.title} &nbsp;{" "}
            <button onClick={() => deleteHandler(index)}>Delete</button>
          </h3>
        );
      })}
    </div>
  );
};

export default TodoList;
