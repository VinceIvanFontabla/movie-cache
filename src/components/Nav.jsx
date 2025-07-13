import { NavLink } from "react-router-dom";

const Nav = ({ handleShowHideNav, isOpen }) => {
  return (
    <nav className={`nav ${isOpen ? "open" : ""}`}>
      <ul>
        <li className="nav-li">
          <NavLink to="/" onClick={handleShowHideNav}>
            Home
          </NavLink>
          <span className="fade-line-bscreen"></span>
        </li>
        <li className="nav-li">
          <NavLink to="/favorites" onClick={handleShowHideNav}>
            Favorites
          </NavLink>
          <span className="fade-line-bscreen"></span>
        </li>
        <li className="nav-li">
          <NavLink to="/about" onClick={handleShowHideNav}>
            About
          </NavLink>
          <span className="fade-line-bscreen"></span>
        </li>
        <li className="nav-li">
          <NavLink to="/contact-us" onClick={handleShowHideNav}>
            Contact Us
          </NavLink>
          <span className="fade-line-bscreen"></span>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
