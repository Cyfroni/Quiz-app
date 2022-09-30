import { getAuth } from "firebase/auth";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "./main";
import { Link } from "react-router-dom";
import "./Root.css";

export default function Root() {
  const { user } = useAuthContext();
  const auth = getAuth();
  return (
    <>
      <nav className="main-nav">
        <div className="main-nav__username">{user?.email}</div>
        <ul className="main-nav__navitems">
          <li>
            <NavLink to="/test">Test</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/admin/addQuestion">Add Question</NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {user && (
            <li>
              <button
                className="main-nav__logoutbtn"
                onClick={() => auth.signOut()}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
