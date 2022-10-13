import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "./Auth";
import Logo from "../public/quizly-logo-big.svg";

const MainNavStyled = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.main};
  font-size: 2rem;
  padding-right: 5rem;

  img {
    height: 100%;
    padding: 0.5rem;
    margin: 0 1rem;
  }

  p {
    margin-right: 5rem;
  }

  ul {
    flex: 1;
    display: flex;
    list-style-type: none;
    color: white;
    height: 100%;

    li {
      /* padding: 1rem 2rem; */
      /* padding: 0 2rem; */
      height: 100%;
      transition: all 0.3s;
      &:last-child {
        margin-left: auto;
      }
      &:hover {
        background-color: ${({ theme }) => theme.colors.main_lighter};
      }
    }

    a,
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      cursor: pointer;

      height: 100%;
      padding: 0 2rem;

      color: inherit;
    }

    button {
      font-size: inherit;
      border: none;
      background: none;
      width: 100%;
    }
  }
`;

export default function Root() {
  const { user, isAdmin, logout } = useAuthContext();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <MainNavStyled>
        <img src={Logo} alt="Quizly logo" />
        <p>{user?.email || "ANONYMOUS"}</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li>
              <Link to="/user/test">Test</Link>
            </li>
          )}
          {user && isAdmin && (
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
              <button onClick={onLogout}>Logout</button>
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
