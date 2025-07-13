import { NavLink } from "react-router-dom";

const NavMobile = ({ handleShowHideNav, isOpen }) => {
  return (
    <nav className={`mobile-nav ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <NavLink to="/" onClick={handleShowHideNav}>
            Home
          </NavLink>

          <span className="fade-line"></span>
        </li>
        <li>
          <NavLink to="/favorites" onClick={handleShowHideNav}>
            Favorites
          </NavLink>
          <span className="fade-line"></span>
        </li>
        <li>
          <NavLink to="/about" onClick={handleShowHideNav}>
            About
          </NavLink>
          <span className="fade-line"></span>
        </li>
        <li>
          <NavLink to="/contact-us" onClick={handleShowHideNav}>
            Contact Us
          </NavLink>
          <span className="fade-line"></span>
        </li>
      </ul>
    </nav>
  );
};

export default NavMobile;
