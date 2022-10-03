import { getAuth } from "firebase/auth";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "./main";

const MainNavStyled = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: orangered;
  font-size: 2rem;
  padding: 0 5rem;

  p {
    margin-right: 5rem;
  }

  ul {
    flex: 1;
    display: flex;
    list-style-type: none;
    color: white;

    li {
      padding: 1rem 2rem;
      transition: all 0.3s;
      &:last-child {
        margin-left: auto;
      }
      &:hover {
        background-color: orange;
        color: #333;
      }
    }

    a,
    button {
      padding: 2rem 0;
      display: block;
      text-decoration: none;
      cursor: pointer;

      text-align: center;
      color: inherit;
    }

    button {
      font-size: inherit;
      border: none;
      background: none;
      width: 100%;
      height: 100%;
    }
  }
`;

export default function Root() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    const auth = getAuth();
    auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <MainNavStyled>
        <p>{user?.email || "ANONYMOUS"}</p>
        <ul>
          <li>
            <Link to="/test">Test</Link>
          </li>
          {user && (
            <li>
              <Link to="/admin/addQuestion">Add Question</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <li>
              <button onClick={() => logout()}>Logout</button>
            </li>
          )}
        </ul>
      </MainNavStyled>
      <main>
        <Outlet />
      </main>
    </>
  );
}
