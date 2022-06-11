import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import Contexto from "../context/Context";

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const { user } = useContext(Contexto);

  useEffect(() => {
    if (user) {
      setLoading(false);
      if (user.role === "admin") {
        setAdmin(true);
        console.log("SOS ADMINISTRADOR");
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  return loading && !admin ? (
    <h1>loading...</h1>
  ) : (
    <> {admin ? children : <Navigate to="/Home" />}</>
  );
}
export default PrivateRoute;
