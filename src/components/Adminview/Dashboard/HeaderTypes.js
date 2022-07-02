import React from "react";
import { Col } from "react-bootstrap";

export const HeaderTypes = ({ title, icon, number }) => {
  return (
    <Col
      md={4}
      className="asdasd"
      onClick={() => console.log("se apreto el DIV")}
    >
      <div className="shirts-info centrar">
        <div className="dashboard-header-icon centrar">
          <div className="icono">
            {/* SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="58"
              viewBox="0 0 72 58"
              fill="none"
            >
              <path
                d="M61.5414 3.40197C60.548 1.32329 58.449 0 56.1451 0H8C3.58172 0 0 3.58171 0 7.99999V49.9844C0 54.4027 3.58173 57.9844 8.00001 57.9844H53.1751H54.1152C55.9689 57.8668 58.4692 57.0646 60.8423 54.9858L62.9114 52.7691C64.85 50.2522 66.5177 46.6356 67.4051 41.5294C69.8017 27.7385 71.3994 19.5893 71.8987 17.2386C72.3291 14.5369 71.5723 9.27335 65.9827 7.06902C64.1346 6.34019 62.3981 5.19444 61.5414 3.40197V3.40197Z"
                fill="#347B9E"
              />
              <rect
                x="5.99158"
                y="6.26855"
                width="52.4262"
                height="47.0144"
                rx="5"
                fill="white"
              />
              <rect
                x="11.9831"
                y="12.5372"
                width="16.4768"
                height="17.2386"
                rx="3"
                fill="#347B9E"
              />
              <rect
                x="34.4515"
                y="12.5372"
                width="17.9747"
                height="4.70144"
                rx="2"
                fill="#347B9E"
              />
              <rect
                x="34.4515"
                y="25.0744"
                width="17.9747"
                height="4.70144"
                rx="2"
                fill="#347B9E"
              />
              <rect
                x="11.9831"
                y="37.6115"
                width="40.443"
                height="6.26859"
                rx="2"
                fill="#347B9E"
              />
            </svg>
          </div>
        </div>
        <div className="types-description">
          <p className="digit">{number}</p>
          <p className="last-info">Total {title}</p>
        </div>
      </div>
    </Col>
  );
};
