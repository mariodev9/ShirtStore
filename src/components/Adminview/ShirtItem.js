import React from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { ButtonShirt } from "../common/ButtonShirt";
import "../../assets/css/ShirtItem.css";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import { useState } from "react";

export const ShirtItem = ({ team, season, type, id }) => {
  const firestore = getFirestore(firebaseApp);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteShirt = (id) => {
    console.log("se elimino shirt", id);

    deleteDoc(doc(firestore, "shirts", id));
  };

  const editShirt = () => {
    console.log("se edito", id);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <ButtonShirt
            onClick={() => {
              handleClose();
              editShirt();
            }}
            msg={"Save Changes"}
            color={"#47B5FF"}
            shadow={"#347daf"}
          />
        </Modal.Footer>
      </Modal>

      <Row className="item-container">
        <Col xs={4}>
          <p>{team}</p>
        </Col>
        <Col>
          <p>{season}</p>
        </Col>
        <Col className="type">
          <p>{type}</p>
        </Col>
        <Col>
          <ButtonShirt
            onClick={handleShow}
            msg={"Edit"}
            color={"#47B5FF"}
            shadow={"#347daf"}
          />
        </Col>
        <Col>
          <ButtonShirt
            onClick={() => deleteShirt(id)}
            msg={"X"}
            color={"#f0003c"}
            shadow={"#650626"}
          />
        </Col>
      </Row>
    </>
  );
};
