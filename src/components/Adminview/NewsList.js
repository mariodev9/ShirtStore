import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { NewItem } from "./NewItem";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import { List } from "reactstrap";

export const NewsList = () => {
  const firestore = getFirestore(firebaseApp);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(firestore, "news"));
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
  }, []);

  return (
    <>
      <Container>
        <h1 className="title">News list</h1>
        <Container fluid>
          <Row>
            {data.map((item) => (
              <NewItem title={item.title} img={item.img} />
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};
