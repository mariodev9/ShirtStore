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
import firebaseApp from "./firebase/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserContext from "./context/UserContext";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  return (
    <>
      <UserContext>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Router>
      </UserContext>
    </>
  );
}

export default App;
