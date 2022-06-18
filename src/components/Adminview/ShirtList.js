import React, { useEffect } from "react";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";

export const ShirtList = () => {
  const firestore = getFirestore(firebaseApp);

  return <div>ShirtList</div>;
};
