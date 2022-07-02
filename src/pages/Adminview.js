import React, { useState } from "react";
import "../assets/css/Adminview.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { ShirtForm } from "../components/Adminview/ShirtForm";
import { ShirtList } from "../components/Adminview/ShirtList";
import { NewsList } from "../components/Adminview/NewsList";
import { Dashboard } from "../components/Adminview/Dashboard/Dashboard";
//
import "../assets/css/Sidenav.css";
import toggle from "../assets/statics/toggle-icon.png";
import close from "../assets/statics/close-icon.png";
import shirt from "../assets/statics/shirt-icon.png";
import {
  Container,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";

export const Adminview = () => {
  const [selected, setSelected] = useState("add");

  return (
    <>
      <Container>
        {/* FORM -------------------------------------------- */}
        <div className="header-admin">
          <h1 className="admin-title">Shirt Store ADMIN</h1>
          <>
            <DropdownButton
              as={ButtonGroup}
              id={`dropdown-variants-primary`}
              variant="primary"
              title="Menu"
              size="sm"
            >
              <Dropdown.Item eventKey="1" onClick={() => setSelected("shirts")}>
                Shirts
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={() => setSelected("news")}>
                News
              </Dropdown.Item>
              <Dropdown.Item eventKey="3" onClick={() => setSelected("add")}>
                add
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Home</Dropdown.Item>
              <Dropdown.Item eventKey="4">Log out</Dropdown.Item>
            </DropdownButton>
          </>
        </div>
        <div className="">
          {selected === "add" && <ShirtForm />}
          {selected === "shirts" && <ShirtList />}
          {selected === "news" && <NewsList />}
          {selected === "dashboard" && <Dashboard />}
        </div>
      </Container>
    </>
  );
};
