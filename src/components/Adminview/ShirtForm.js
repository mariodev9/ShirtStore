import React, { useState, useEffect } from "react";
import firebaseApp from "../../firebase/credentials";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ButtonShirt } from "../common/ButtonShirt";

export const ShirtForm = () => {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [teamname, setTeamname] = useState("");
  const [season, setSeason] = useState("");
  const [type, setType] = useState("");
  // porcentaje de carga de la imagen
  const [per, setPer] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImg(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault();
    // TOMA COMO QUE TODOS SON NULL
    if (season === "" || teamname === "" || type === "" || img === "") {
      console.log(teamname, season, type, img);
      notifyError();
    } else {
      const docRef = await addDoc(collection(firestore, "shirts"), {
        season: season,
        team: teamname,
        type: type,
        img: img,
      });
      // console.log(teamname, season, type, img);
      // console.log("documento creado con id", docRef.id);
      notifySuccess();
    }
  };

  // Notifications
  const notifyError = () => toast.error("Todos los campos son requeridos!");
  const notifySuccess = () => toast.success("Agregado con exito!");

  return (
    <div className="container">
      <ToastContainer position="top-center" />

      <div className="row">
        <div className="col-md-6">
          <h2 className="title">Add a shirt</h2>

          <form className="shirts-form" onSubmit={handleAdd}>
            <FloatingLabel label="Team Shirt" className="mb-3 ">
              <Form.Control
                className="shirt-input"
                value={teamname}
                onChange={(e) => {
                  setTeamname(e.target.value);
                }}
                type="text"
                id="team"
                name="team"
                placeholder="Juventus"
              />
            </FloatingLabel>
            <FloatingLabel label="Season" className="mb-3 hola">
              <Form.Control
                className="shirt-input"
                value={season}
                onChange={(e) => {
                  setSeason(e.target.value);
                }}
                type="number"
                name="season"
                id="season"
                placeholder="2022"
              />
            </FloatingLabel>

            <Form.Select
              className="shirt-input"
              aria-label="Default select example"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="">Select type</option>
              <option value="Home">Home</option>
              <option value="Away">Away</option>
            </Form.Select>

            <Form.Group className="mb-3 ">
              <Form.Control
                className="shirt-input"
                type="file"
                id="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </Form.Group>

            {/* <input
              className="add-button"
              disabled={per != null && per < 100}
              type="submit"
              value="Agregar"
            /> */}

            <ButtonShirt
              type="submit"
              msg={"Agregar"}
              color={"#00C897"}
              shadow={"#146356"}
            />
          </form>
        </div>
        <div className="col-md-6">
          <h2 className="title">Preview</h2>
          <div className="preview">
            <div className="container-image">
              {img && <img className="imagenfire" src={img} alt="" />}
            </div>
            <p className="description">
              {teamname} {season}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
