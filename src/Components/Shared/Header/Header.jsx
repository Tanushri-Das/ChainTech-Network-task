import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <a className="navbar-brand fs-3 fw-bold">Users</a>
          </div>
          <div className="d-flex align-items-center">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item d-flex">
                <Link
                  to="/"
                  className="nav-link active fs-5 fw-semibold"
                  aria-current="page"
                >
                  Home
                </Link>
                <Link
                  to="/userinfo"
                  className="nav-link active fs-5 fw-semibold ms-3"
                  aria-current="page"
                >
                  UseInfo
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center ms-3">
              {user ? (
                <>
                  <Button
                    onClick={handleLogout}
                    className="btn btn-success fs-5 fw-semibold"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      className="btn btn-success fs-5 fw-semibold"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
