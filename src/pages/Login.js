import React, { useState, useContext, useEffect } from "react";
import firebaseApp from "../firebase/credentials";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Contexto from "../context/Context";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const { user, setNombre, nombre, setUsuario } = useContext(Contexto);

  // Dado un USER ID : consulta a la BASE DE DATOS sobre ese usuario y obtiene el ROL
  async function getRole(uid) {
    const docuRef = doc(firestore, `users/${uid}`);
    const dataUser = await getDoc(docuRef);
    const role = dataUser.data().role;
    return role;
  }

  // guarda USUARIO y ROL en el estado
  function setUserAndRole(firebaseUser) {
    getRole(firebaseUser.uid).then((role) => {
      const userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.email,
        role: role,
      };
      console.log(userData, "LA DATA A ACTUALIZAR");
      // setuserdata
    });
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      if (!user) {
        setUserAndRole(firebaseUser);
      }
    } else {
      // set user null
    }
  });

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
    if (auth && email && password) {
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
      <h1>{isRegister ? "Registrate" : "Inicia sesion"}</h1>
      <h2>{nombre}</h2>
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

      <button onClick={() => setNombre("pepe")}>APRETA</button>
    </div>
  );
};
