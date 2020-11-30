import React, { useContext } from "react";
import "../App.css";
// import TabNav from '../components/tabs'
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import SimpleTab from "../components/tabs"

console.log(`user says auth state is ${AuthContext.isAuthenticated}`);


export default function User() {

  const authContext = useContext(AuthContext);

  return authContext.isAuthenticated ? (
    <div>
<SimpleTab></SimpleTab>

    </div>
  ) : (
    <Redirect to="/">
      {console.log(`User says auth state is ${AuthContext.isAuthenticated}`)}
    </Redirect>
  );
}
