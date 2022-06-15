import React, { useState } from "react";
import firebaseApp from "../firebase/credentials";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// function NavDropdownExample() {

//   return (
//     <Navbar key="sm" bg="light" expand="sm" className="mb-3">
//       <Container fluid>
//         <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
//         <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
//         <Navbar.Offcanvas
//           id={`offcanvasNavbar-expand-sm`}
//           aria-labelledby={"offcanvasNavbarLabel-expand-sm"}
//           placement="end"
//         >
//           <Offcanvas.Header closeButton>
//             <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
//               Offcanvas
//             </Offcanvas.Title>
//           </Offcanvas.Header>
//           <Offcanvas.Body>
//             <Nav className="justify-content-end flex-grow-1 pe-3">
//               <Nav.Link href="#action1">Home</Nav.Link>
//               <Nav.Link href="#action2">Link</Nav.Link>
//               <NavDropdown
//                 title="Dropdown"
//                 id={`offcanvasNavbarDropdown-expand-sm`}
//               >
//                 <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action4">
//                   Another action
//                 </NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="#action5">
//                   Something else here
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//             <Form className="d-flex">
//               <FormControl
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-success">Search</Button>
//             </Form>
//           </Offcanvas.Body>
//         </Navbar.Offcanvas>
//       </Container>
//     </Navbar>
//   );
// }

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  // -------------------------------------------------

  // Register the user in the FIRESTORE
  async function RegisterUser(email, password, role) {
    const userData = await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        return user;
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("The email address is already in use");
        } else if (error.code === "auth/invalid-email") {
          setError("The email address is not valid.");
        } else if (error.code === "auth/operation-not-allowed") {
          setError("Operation not allowed.");
        } else if (error.code === "auth/weak-password") {
          setError("The password is too weak.");
        } else {
          console.log("error");
        }
        setTimeout(() => {
          setError("");
        }, 3000);
      });
    const docuRef = doc(firestore, `users/${userData.user.uid}`);
    setDoc(docuRef, { email: email, role: role });
  }

  // Init session with AUTH
  function signIn(auth, email, password) {
    if ((auth, email, password)) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          window.location.replace("/Home");
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setError("Wrong email/password!");
          } else if (error.code === "auth/user-not-found") {
            setError("Wrong email/password!");
          } else {
            setError("Error");
          }
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  }

  function HandleSubmit(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const role = e.target.elements.role.value;

    if (isRegister) {
      RegisterUser(email, password, role);
    } else {
      signIn(auth, email, password);
    }
  }

  return (
    <div>
      {/* <NavDropdownExample /> */}
      <h1>{isRegister ? "Registrate" : "Inicia sesion"}</h1>
      <form onSubmit={HandleSubmit}>
        <label>
          Email:
          <input type="email" name="email" id="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" id="password" />
        </label>

        <label>
          Role:
          <select name="role" id="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <input
          type="submit"
          value={isRegister ? "Registrar" : "Inicia Sesion"}
        />
      </form>
      <div className="error-message" style={{ color: {} }}>
        <p>{error}</p>
      </div>

      {/* SOLO CAMBIA EL ESTADO DE REGISTER */}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Ya tengo cuenta" : "Quiero registrarme"}
      </button>
    </div>
  );
};
