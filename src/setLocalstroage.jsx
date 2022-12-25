function setLocal(todo) {
  if (todo) {
    localStorage.setItem("todo");
  }
  return todo;
}

export default setLocal;
