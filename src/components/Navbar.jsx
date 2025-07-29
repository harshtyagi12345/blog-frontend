import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // hamburger icons

export const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/" onClick={closeMenu}>Harshit Tyagi</NavLink>
          </div>

          {/* Hamburger Icon */}
          <div className="hamburger" onClick={toggleMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          <nav className={isMobileMenuOpen ? "mobile-nav open" : "mobile-nav"}>
            <ul>
              <li>
                <NavLink to="/" onClick={closeMenu}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={closeMenu}>About</NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
              </li>
              <li>
                <NavLink to="/blogs"> Blogs </NavLink>
              </li>
              <li>
                <NavLink to="/create">Create</NavLink>
              </li>
              {isLoggedIn ? (
                <>

                  {user.isAdmin && (
                    <>
                      {console.log("Rendering Admin NavLink")}
                      <li>
                        <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>
                      </li>
                    </>
                  )}

                  <li>
                    <NavLink to="/logout" onClick={closeMenu}>Logout</NavLink>
                  </li>

                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
