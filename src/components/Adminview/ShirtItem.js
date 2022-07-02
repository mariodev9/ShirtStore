import React, { useState } from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { ButtonShirt } from "../common/ButtonShirt";
import "../../assets/css/ShirtItem.css";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ShirtItem = ({ team, season, type, id, img, DeleteShirt }) => {
  const firestore = getFirestore(firebaseApp);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const deleteShirt = async (id) => {
  //   deleteDoc(doc(firestore, "shirts", id)).then(notifySuccess());
  // };

  const editShirt = () => {
    console.log("se edito", id);
  };

  const notifySuccess = () =>
    toast.success("Se elimino con exito! Actualiza para ver los cambios");
  const notifyError = () => toast.error("Ocurrio un error");

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{team}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{season}</p>
          <p>{type}</p>

          <img src={img} alt="" srcset="" />
        </Modal.Body>
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
        <Col xs={3}>
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
            onClick={() => {
              DeleteShirt();
            }}
            msg={"Delete"}
            color={"#f0003c"}
            shadow={"#650626"}
          />
        </Col>
      </Row>
    </>
  );
};
