import React, { useState } from "react";
import "../assets/css/Adminview.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Link } from "react-router-dom";
import { ShirtForm } from "../components/Adminview/ShirtForm";
import { ShirtList } from "../components/Adminview/ShirtList";
import { NewsList } from "../components/Adminview/NewsList";

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
            <NavItem eventKey="add">
              <NavIcon> icon</NavIcon>
              <NavText>Add</NavText>
            </NavItem>
            <NavItem eventKey="shirts">
              <NavIcon> icon</NavIcon>
              <NavText>Shirts</NavText>
            </NavItem>
            <NavItem eventKey="news">
              <NavIcon> icon</NavIcon>
              <NavText>News</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>

        {/* FORM -------------------------------------------- */}
        <h1 className="admin-title">Shirt Store ADMIN</h1>
        <div className="">
          {selected === "add" && <ShirtForm />}
          {selected === "shirts" && <ShirtList />}
          {selected === "news" && <NewsList />}
        </div>
      </div>
    </>
  );
};
