import { useState, useEffect } from "react";
import Context from "./Context";
import firebaseApp from "../firebase/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function UserContext(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [mensaje, setMensaje] = useState("");

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
      setUser(userData);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        if (!user) {
          setUserAndRole(firebaseUser);
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        mensaje,
        setMensaje,
      }}
    >
      {children}
    </Context.Provider>
  );
}
