import React from "react";

const TodoList = ({ todos, deleteHandler }) => {
  return (
    <div>
      {todos.map((todo, index) => {
        localStorage.setItem("todo", todo);
        return (
          <h3 key={index}>
            {todo} &nbsp;{" "}
            <button onClick={() => deleteHandler(index)}>Delete</button>
          </h3>
        );
      })}
    </div>
  );
};

export default TodoList;
