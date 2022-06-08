import { useState, useEffect } from "react";
import Context from "./Context";
import { usuario } from "./InitialState";
import firebaseApp from "../firebase/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function UserContext(props) {
  const { children } = props;
  const [user, setUsuario] = useState(null);

  const data = {
    uid: "123",
    name: "mario",
    role: "admin",
  };

  async function getRole(uid) {
    const docuRef = doc(firestore, `users/${uid}`);
    const dataUser = await getDoc(docuRef);
    const role = dataUser.data().role;
    return role;
  }

  function setUserAndRole(firebaseUser) {
    getRole(firebaseUser.uid).then((role) => {
      const userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.email,
        role: role,
      };
      setUsuario(userData);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        if (!user) {
          setUserAndRole(firebaseUser);
        }
      } else {
        setUsuario(null);
      }
    });
  }, []);

  return (
    <Context.Provider
      value={{
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
}
