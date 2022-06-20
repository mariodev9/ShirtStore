import React, { useState } from "react";
import "../assets/css/Adminview.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Link } from "react-router-dom";
import { ShirtForm } from "../components/Adminview/ShirtForm";
import { ShirtList } from "../components/Adminview/ShirtList";

export const Adminview = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="asd">
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
        <div className="">
          {selected === "shirts" && <ShirtForm />}
          {selected === "list" && <ShirtList />}
        </div>
      </div>
    </>
  );
};
