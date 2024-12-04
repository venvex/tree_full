import React from "react";
import { NavLink } from "react-router-dom";

export const Home = ({}) => {
  return (
    <>
      <h1>Welcome to the Home Page.dxfdghjk</h1>;
      <NavLink to="./admin">Cu Navlink</NavLink>
      <a href="/admin">Link simplu</a>
    </>
  );
};
