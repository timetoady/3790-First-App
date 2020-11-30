import React, { useContext } from "react";
import "../App.css";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import SimpleTab from "../components/tabs"

console.log(`user says auth state is ${AuthContext.isAuthenticated}`);


export default function User() {

  const authContext = useContext(AuthContext);

  return authContext.isAuthenticated ? (
    
<SimpleTab>
  
</SimpleTab>

 
  ) : (
    <Redirect to="/">
      {console.log(`User says auth state is ${AuthContext.isAuthenticated}`)}
    </Redirect>
  );
}
