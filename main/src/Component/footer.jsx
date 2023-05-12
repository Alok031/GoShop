import React from 'react'
import { NavLink } from 'react-router-dom'
import "./page.css";

const footer = () => {
  const year = new Date().getFullYear();
  return (
  <footer >
  <hr/>
    <p >Copyright, Inc © {year}</p>
  </footer>
  )
}

export default footer
