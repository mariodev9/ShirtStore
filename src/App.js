import { useState } from "react";
import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import UserContext from "./context/UserContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { About } from "./pages/About";
import { Adminview } from "./pages/Adminview";
import PrivateRoute from "./router/PrivateRoute";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Router>
        <UserContext>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/Login" element={<Login />} />
            <Route
              path="/Home"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/About"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />

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
