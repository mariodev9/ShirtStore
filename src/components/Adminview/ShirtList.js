import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import { ShirtItem } from "./ShirtItem";
import { Container } from "react-bootstrap";

export const ShirtList = () => {
  const firestore = getFirestore(firebaseApp);
  const [data, setData] = useState([]);

  const deleteShirt = async (id) => {
    deleteDoc(doc(firestore, "shirts", id));
    fetchData();
  };

  const fetchData = async () => {
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(firestore, "shirts"));
      querySnapshot.forEach((doc) => {
        let dataShirt = doc.data();
        dataShirt.id = doc.id;
        list.push(dataShirt);
      });
    } catch (error) {}
    setData(list);
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <Container>
      <h1 className="title">ShirtList</h1>
      <Container fluid className="shirts-container">
        {data.map((shirt) => (
          <ShirtItem
            id={shirt.id}
            team={shirt.team}
            season={shirt.season}
            type={shirt.type}
            img={shirt.img}
            DeleteShirt={() => deleteShirt(shirt.id)}
          />
        ))}
      </Container>
    </Container>
  );
};
