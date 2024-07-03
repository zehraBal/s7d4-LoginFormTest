import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Success from "./components/Success";

import "./layout.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
