import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { Button } from "react-bootstrap";

const Header = () => {
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  // Close the menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2">
      <div className="container">
        <Link to="/" className="navbar-brand fs-2 fw-semibold">
          UserEase
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMenuToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isMenuOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav d-flex justify-content-center align-items-center">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link fs-4 ${
                  location.pathname === "/" ? "active" : ""
                }`}
                onClick={() => setIsMenuOpen(false)} // Close menu on Link click
              >
                {location.pathname === "/" ? <strong className="fs-4">Home</strong> : "Home"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/userinfo"
                className={`nav-link fs-4 ${
                  location.pathname === "/userinfo" ? "active" : ""
                }`}
                onClick={() => setIsMenuOpen(false)} // Close menu on Link click
              >
                {location.pathname === "/userinfo" ? (
                  <strong className="fs-4">Userinfo</strong>
                ) : (
                  "Userinfo"
                )}
              </Link>
            </li>
            <li className="nav-item my-3 my-lg-0 ms-0 ms-lg-2">
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
                      onClick={() => setIsMenuOpen(false)} // Close menu on Link click
                    >
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
