import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TextEditor from "./Pages/TextEditor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" exact element={<Home />} />
          {/* <Route path="/document/:id" element={<TextEditor />} /> */}
        </Route>
        <Route path="/document/:id" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
