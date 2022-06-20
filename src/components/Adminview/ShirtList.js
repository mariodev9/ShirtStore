import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import { ShirtItem } from "./ShirtItem";
import { Container } from "react-bootstrap";

export const ShirtList = () => {
  const firestore = getFirestore(firebaseApp);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(firestore, "shirts"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          list.push(doc.data());
        });
      } catch (error) {}
      setData(list);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="title">ShirtList</h1>
      <Container fluid className="shirts-container">
        {data.map((shirt) => (
          <ShirtItem
            team={shirt.team}
            season={shirt.season}
            type={shirt.type}
          />
        ))}
      </Container>
    </Container>
  );
};
