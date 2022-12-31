import Login from "./Components/LoginComp/Login";
import TodoComp from "./Components/TodoComp/TodoComp";
import Signup from "./Components/SignupComp/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<TodoComp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
