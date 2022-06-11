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
    // al logear no lee username xq el campo no existe

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
      <h1>{isRegister ? "Registrate" : "Inicia sesion"}</h1>
      <form onSubmit={HandleSubmit}>
        {/* <label>
          Username:
          <input type="text" name="username" id="username" />
        </label> */}

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
          <select name="Role" id="role">
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
