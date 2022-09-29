import { getAuth } from "firebase/auth";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "./main";
import { Link } from "react-router-dom";
import "./Root.css";

export default function Root() {
  const { user } = useAuthContext();
  const auth = getAuth();
  return (
    <>
      <div>{user?.email}</div>
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/">/</Link>
          </li>
          <li>
            <Link to="/test">test</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/admin">admin</Link>
          </li>
        </ul>
      </nav>
      <button onClick={() => auth.signOut()}>logout</button>
      <Outlet />
    </>
  );
}
