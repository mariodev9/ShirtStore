import React, { useState } from "react";
import "../../assets/css/NewItem.css";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { ButtonShirt } from "../common/ButtonShirt";

export const NewItem = ({ title, img }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editNew = () => {
    console.log("se edito");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{title}</p>
          <img src={img} alt="" srcset="" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <ButtonShirt
            onClick={() => {
              handleClose();
              editNew();
            }}
            msg={"Save Changes"}
            color={"#47B5FF"}
            shadow={"#347daf"}
          />
        </Modal.Footer>
      </Modal>

      {/* Item */}
      <Col xl={4} className="new-container">
        <Card className="card-new">
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title className="new-title">{title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <ButtonShirt msg={"Delete"} color={"#f0003c"} shadow={"#650626"} />
            <ButtonShirt
              msg={"Edit"}
              color={"#47B5FF"}
              shadow={"#347daf"}
              onClick={handleShow}
            />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
