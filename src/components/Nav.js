import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Contexto from "../context/Context";
import "../assets/css/Navbar.css";
import firebaseApp from "../firebase/credentials";
import { getAuth, signOut } from "firebase/auth";

export const Nav = () => {
  const auth = getAuth(firebaseApp);
  const [admin, setAdmin] = useState(false);

  const { user } = useContext(Contexto);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setAdmin(true);
      }
    }
  }, [user]);

  const CloseSession = () => {
    window.location.replace("/Login");
    signOut(auth);
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link className="nav-link" to={"/Home"}>
                Shop
              </Link>
            </li>
            <li class="nav-item active">
              <Link className="nav-link" to={"/Home"}>
                Retro
              </Link>
            </li>
            <li class="nav-item active">
              <Link className="nav-link" to={"/About"}>
                About
              </Link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Usuario
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {user ? (
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      CloseSession();
                    }}
                  >
                    cerrar sesion
                  </button>
                ) : (
                  <Link className="dropdown-item" to={"/Login"}>
                    Login
                  </Link>
                )}
                {admin && (
                  <Link className="dropdown-item" to={"/Admin"}>
                    Admin
                  </Link>
                )}
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <a class="dropdown-item" href="#">
                  Something
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
