import React, { useState, useEffect } from "react";
import "../assets/css/Adminview.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { Link } from "react-router-dom";
import { ShirtForm } from "../components/Adminview/ShirtForm";
import { ShirtList } from "../components/Adminview/ShirtList";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import firebaseApp from "../firebase/credentials";

export const Adminview = () => {
  const firestore = getFirestore(firebaseApp);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(firestore, "shirts"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {}
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <SideNav
        onSelect={(active) => {
          setSelected(active);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <Link to={"/Home"}>Home </Link>
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="shirts">
            <NavIcon> icon</NavIcon>
            <NavText>Shirts</NavText>
          </NavItem>
          <NavItem eventKey="list">
            <NavIcon> icon</NavIcon>
            <NavText>News</NavText>
          </NavItem>
          <NavItem eventKey="users">
            <NavIcon> icon</NavIcon>
            <NavText>Users</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>

      {/* FORM -------------------------------------------- */}
      <h1 className="admin-title">Shirt Store ADMIN</h1>
      <div className="admin-container">
        {selected === "shirts" && <ShirtForm />}
        {selected === "list" && <ShirtList />}
      </div>
    </>
  );
};
