import React, { useState, useEffect } from "react";
import "../assets/css/Adminview.css";
import firebaseApp from "../firebase/credentials";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const Adminview = () => {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [teamname, setTeamname] = useState("");
  const [season, setSeason] = useState(null);
  const [type, setType] = useState("");

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
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
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
      <h1>ADMIN VIEW</h1>

      <form onSubmit={handleAdd}>
        <label>
          Team:
          <input
            value={teamname}
            onChange={(e) => {
              setTeamname(e.target.value);
            }}
            type="text"
            name="team"
            id="team"
          />
        </label>
        <label>
          Season:
          <input
            value={season}
            onChange={(e) => {
              setSeason(e.target.value);
            }}
            type="number"
            name="season"
            id="season"
          />
        </label>
        <label>
          Type:
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="home">Home</option>
            <option value="away">Away</option>
          </select>
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <input type="submit" value="Add" />
      </form>

      <img className="imagenfire" src={img} alt="" />
    </>
  );
};
