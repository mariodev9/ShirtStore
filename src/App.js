import { useState } from "react";
import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import UserContext from "./context/UserContext";
import { Adminview } from "./pages/Adminview";
import PrivateRoute from "./router/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <UserContext>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route
              path="/Admin"
              element={
                <PrivateRoute>
                  <Adminview />
                </PrivateRoute>
              }
            />
          </Routes>
        </UserContext>
      </Router>
    </>
  );
}

export default App;
