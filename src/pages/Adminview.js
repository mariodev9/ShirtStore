import React, { useState, useEffect } from "react";
import firebaseApp from "../firebase/credentials";
import "../assets/css/Adminview.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export const Adminview = () => {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [teamname, setTeamname] = useState("");
  const [season, setSeason] = useState(null);
  const [type, setType] = useState("home");
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

    const docRef = await addDoc(collection(firestore, "shirts"), {
      season: season,
      team: teamname,
      type: type,
      img: img,
    });
    console.log("documento creado con id", docRef.id);
  };

  return (
    <>
      <SideNav
        onSelect={(selected) => {
          console.log("se apreto", selected);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon> icon</NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="shirts">
            <NavIcon> icon</NavIcon>
            <NavText>Shirts</NavText>
          </NavItem>
          <NavItem eventKey="news">
            <NavIcon> icon</NavIcon>
            <NavText>News</NavText>
          </NavItem>
          <NavItem eventKey="users">
            <NavIcon> icon</NavIcon>
            <NavText>Users</NavText>
          </NavItem>
          {/* <NavItem eventKey="charts/barchart">
              <NavText>Bar Chart</NavText>
            </NavItem> */}
        </SideNav.Nav>
      </SideNav>

      {/* FORM -------------------------------------------- */}
      <div className="admin-container">
        <div className="container">
          <h1 className="title">Shirt Store ADMIN</h1>

          <form className="shirts-form" onSubmit={handleAdd}>
            <FloatingLabel label="Team Shirt" className="mb-3 hola">
              <Form.Control
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
              className="hola"
              aria-label="Default select example"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="home">Home</option>
              <option value="away">Away</option>
            </Form.Select>

            <Form.Group className="mb-3 hola">
              <Form.Control
                type="file"
                id="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </Form.Group>
            <input
              disabled={per != null && per < 100}
              type="submit"
              value="Agregar!"
            />
          </form>
          <h2 className="title">Preview</h2>
          <h3>{teamname}</h3>
          <img className="imagenfire" src={img} alt="" />
        </div>
      </div>
    </>
  );
};
