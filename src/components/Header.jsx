import { useState } from "react";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import logo from "../assets/header-logo.svg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="Movie Hub" />
        </NavLink>
      </div>
      <div className="main-nav-mobile">
        <div className="hamburger-menu" onClick={handleToggleMenu}>
          <div className={`hamburger ${isOpen ? "open" : ""}`} id="hamburger-1">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
        <NavMobile handleShowHideNav={handleToggleMenu} isOpen={isOpen} />
      </div>
      <Nav handleShowHideNav={handleToggleMenu} isOpen={isOpen} />
    </header>
  );
}

export default Header;
