import React, { useState } from "react";
import "../../assets/css/Sidenav.css";
import toggle from "../../assets/statics/toggle-icon.png";
import close from "../../assets/statics/close-icon.png";

function Sidenav() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar">
        <a to="#" className="menu-bars">
          <div className="toggle-button" onClick={showSidebar}>
            <img src={toggle} alt="" srcset="" />
          </div>
        </a>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <img className="close-icon" src={close} alt="" />
          </li>
          <li className="nav-text">
            <a>
              icono
              <span>titulo</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidenav;
