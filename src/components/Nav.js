import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Contexto from "../context/Context";
import "../assets/css/Navbar.css";
import firebaseApp from "../firebase/credentials";
import { getAuth, signOut } from "firebase/auth";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

export const HeaderNavbar = () => {
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
      <Navbar key="sm" bg="light" expand="sm" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">ShirtStore</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={"offcanvasNavbarLabel-expand-sm"}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link>
                  <Link to={"/Home"}>Home</Link>
                </Nav.Link>
                <Nav.Link href="#action2">
                  <Link to={"/Shop"}>Shop</Link>
                </Nav.Link>
                <NavDropdown
                  title="User"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="#action3">About</NavDropdown.Item>

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
                    <NavDropdown.Item>
                      <Link to={"/Login"}>Login</Link>
                    </NavDropdown.Item>
                  )}

                  {admin && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Link className="dropdown-item" to={"/Admin"}>
                          Admin
                        </Link>
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
